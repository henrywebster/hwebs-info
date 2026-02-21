DATA_DIR ?= data
CACHE_DIR ?= .cache
DIST_DIR ?= dist
TEMPLATES_DIR ?= templates

-include .env
export USER_AGENT
export GITHUB_TOKEN
export GITHUB_EMAIL

serve:
	darkhttpd $(DIST_DIR) \
		--no-listing \
		--header "X-Frame-Options: DENY" \
		--header "Content-Security-Policy: frame-ancestors 'none';"

STATIC_SOURCES := $(shell find $(DATA_DIR)/static -type f)

$(DIST_DIR)/static: $(STATIC_SOURCES)
	@mkdir -p $(DIST_DIR)/static/
	cp -ru $(DATA_DIR)/static/* $@

# home page
$(CACHE_DIR)/%.html: $(DATA_DIR)/%.md
	@mkdir -p $(CACHE_DIR)
	pandoc $< -o $@

$(CACHE_DIR)/home.json: $(CACHE_DIR)/hello.html $(CACHE_DIR)/why.html
	./scripts/layout.nu \
		--page-name "home" \
		$^ > $@

$(CACHE_DIR)/index.html: $(CACHE_DIR)/home.json $(TEMPLATES_DIR)/layout.tmpl $(TEMPLATES_DIR)/home.tmpl
	gomplate \
    	-c .=$< \
    	--template layout=$(TEMPLATES_DIR)/base.tmpl \
    	--file=$(TEMPLATES_DIR)/home.tmpl > $@

$(DIST_DIR)/index.html: $(CACHE_DIR)/index.html
	@mkdir -p $(DIST_DIR)
	ln -f $< $@ 

# etc page
$(CACHE_DIR)/music.html: $(DATA_DIR)/music.json $(TEMPLATES_DIR)/music.tmpl
	@mkdir -p $(CACHE_DIR)
	# TODO order by date_released
	gomplate -c .=$< --file=$(TEMPLATES_DIR)/music.tmpl > $@

$(CACHE_DIR)/etc.json: $(DATA_DIR)/milton.html $(CACHE_DIR)/music.html
	./scripts/layout.nu \
		--page-name "etc" \
		--hide-milton \
		$^ > $@

$(DIST_DIR)/etc/index.html: $(CACHE_DIR)/etc.json $(TEMPLATES_DIR)/base.tmpl $(TEMPLATES_DIR)/content.tmpl 
	@mkdir -p $(DIST_DIR)/etc/
	gomplate \
    	-c .=$< \
    	--template layout=$(TEMPLATES_DIR)/base.tmpl \
    	--file=$(TEMPLATES_DIR)/content.tmpl > $@

# blog page
POSTS := $(wildcard $(DATA_DIR)/posts/*.md)
POST_CACHE_HTML_FILES := $(patsubst $(DATA_DIR)/posts/%.md,$(CACHE_DIR)/posts/%.html,$(POSTS))
POST_DIST_HTML_FILES := $(patsubst $(DATA_DIR)/posts/%.md,$(DIST_DIR)/blog/post/%.html,$(POSTS))

$(CACHE_DIR)/posts.json: $(DATA_DIR)/posts.csv $(POST_CACHE_HTML_FILES)
	./scripts/process_posts.nu < $< > $@

$(CACHE_DIR)/blog.html: $(CACHE_DIR)/posts.json $(TEMPLATES_DIR)/blog.tmpl
	@mkdir -p $(CACHE_DIR)
	gomplate -c .=$< --file=$(TEMPLATES_DIR)/blog.tmpl > $@

$(CACHE_DIR)/blog.json: $(CACHE_DIR)/blog.html
	./scripts/layout.nu \
		--page-name "blog" \
		$^ > $@

$(DIST_DIR)/blog/index.html: $(CACHE_DIR)/blog.json $(TEMPLATES_DIR)/base.tmpl $(TEMPLATES_DIR)/content.tmpl
	@mkdir -p $(DIST_DIR)/blog/
	gomplate \
    	-c .=$< \
    	--template layout=$(TEMPLATES_DIR)/base.tmpl \
    	--file=$(TEMPLATES_DIR)/content.tmpl > $@

$(CACHE_DIR)/posts/%.html: $(DATA_DIR)/posts/%.md
	@mkdir -p $(CACHE_DIR)/posts/
	pandoc $< -o $@

$(DIST_DIR)/blog/feed.xml: $(CACHE_DIR)/posts.json $(POST_CACHE_HTML_FILES)
	@mkdir -p $(DIST_DIR)/blog/
	./scripts/generate_feed.nu < $< > $@

$(CACHE_DIR)/posts/%.json: $(DATA_DIR)/posts.csv $(CACHE_DIR)/posts/%.html
	./scripts/process_post_page.nu $* < $< > $@

$(DIST_DIR)/blog/post/%.html: $(CACHE_DIR)/posts/%.json $(TEMPLATES_DIR)/base.tmpl $(TEMPLATES_DIR)/post.tmpl
	@mkdir -p $(DIST_DIR)/blog/post/
	gomplate \
    	-c .=$< \
    	--template layout=$(TEMPLATES_DIR)/base.tmpl \
    	--file=$(TEMPLATES_DIR)/post.tmpl > $@

# now page
$(CACHE_DIR)/github_response.json: scripts/get_commits.nu
	./scripts/get_commits.nu > $@ || (rm -f $@; exit 1)

$(CACHE_DIR)/code.json: $(CACHE_DIR)/github_response.json scripts/process_commits.nu
	@mkdir -p $(CACHE_DIR)
	# TODO error
	./scripts/process_commits.nu < $< > $@

$(CACHE_DIR)/commits.html: $(CACHE_DIR)/code.json $(TEMPLATES_DIR)/commits.tmpl 
	gomplate --datasource commits=$< --file=$(TEMPLATES_DIR)/commits.tmpl > $@

$(CACHE_DIR)/status.json: scripts/get_status.nu
	@mkdir -p $(CACHE_DIR)
	# TODO err
	./scripts/get_status.nu > $@

$(CACHE_DIR)/status.html: $(CACHE_DIR)/status.json $(TEMPLATES_DIR)/status.tmpl
	gomplate --datasource data=$< --file=$(TEMPLATES_DIR)/status.tmpl > $@

$(CACHE_DIR)/reading.xml:
	@mkdir -p $(CACHE_DIR)
	./scripts/get_reading.nu > $@

$(CACHE_DIR)/reading.json: $(CACHE_DIR)/reading.xml
	./scripts/process_reading.nu < $< > $@
	
$(CACHE_DIR)/reading.html: $(CACHE_DIR)/reading.json $(TEMPLATES_DIR)/reading.tmpl
	gomplate --datasource books=$< --file=$(TEMPLATES_DIR)/reading.tmpl > $@

$(CACHE_DIR)/watched.xml:
	@mkdir -p $(CACHE_DIR)
	nu -c "http get https://letterboxd.com/hwebs/rss/" > $@

$(CACHE_DIR)/watched.json: $(CACHE_DIR)/watched.xml scripts/process_watched.nu
	./scripts/process_watched.nu < $< > $@

$(CACHE_DIR)/watched.html: $(CACHE_DIR)/watched.json $(TEMPLATES_DIR)/watched.tmpl
	gomplate --datasource films=$< --file=$(TEMPLATES_DIR)/watched.tmpl > $@

$(CACHE_DIR)/now.json: $(CACHE_DIR)/commits.html $(CACHE_DIR)/watched.html $(CACHE_DIR)/reading.html $(CACHE_DIR)/status.html 
	./scripts/layout.nu \
		--page-name "now" \
		$^ > $@

$(DIST_DIR)/now/index.html: $(CACHE_DIR)/now.json $(TEMPLATES_DIR)/base.tmpl $(TEMPLATES_DIR)/content.tmpl
	@mkdir -p $(DIST_DIR)/now/
	gomplate \
    	-c .=$< \
    	--template layout=$(TEMPLATES_DIR)/base.tmpl \
    	--file=$(TEMPLATES_DIR)/content.tmpl > $@

docker-build:
	docker build -t hwebs-info .

docker-run:
	docker run -p 8080:80 --env-file .env hwebs-info

clean:
	rm -rf $(DIST_DIR)
	rm -rf $(CACHE_DIR)

clean-for-update:
	rm -f $(CACHE_DIR)/reading.xml
	rm -f $(CACHE_DIR)/watched.xml
	rm -f $(CACHE_DIR)/status.json
	rm -f $(CACHE_DIR)/github_response.json

PAGES := $(DIST_DIR)/index.html \
	 $(DIST_DIR)/now/index.html \
	 $(DIST_DIR)/blog/index.html \
	 $(DIST_DIR)/etc/index.html

all: $(PAGES) $(DIST_DIR)/static $(POST_DIST_HTML_FILES) $(DIST_DIR)/blog/feed.xml

format:
	gofmt -w web.go
	prettier --write "**/*.css"
	-djlint --reformat --profile=golang $(TEMPLATES_DIR)/*.tmpl
	shfmt -w *.sh

.PHONY: serve all clean clean-for-update docker-build docker-run format
