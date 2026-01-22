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

hwebs-info: web.go
	go build

$(DIST_DIR)/static: $(STATIC_SOURCES)
	@mkdir -p $(DIST_DIR)/static/
	cp -ru $(DATA_DIR)/static/* $@

# home page
$(CACHE_DIR)/%.html: $(DATA_DIR)/%.md
	@mkdir -p $(CACHE_DIR)
	pandoc $< -o $@

$(CACHE_DIR)/index.html: $(CACHE_DIR)/hello.html $(CACHE_DIR)/why.html hwebs-info
	./hwebs-info -page=home > $@ || (rm -f $@; exit 1)

$(DIST_DIR)/index.html: $(CACHE_DIR)/index.html
	@mkdir -p $(DIST_DIR)
	ln -f $< $@ 

# etc page
$(CACHE_DIR)/music.html: hwebs-info $(TEMPLATES_DIR)/music.tmpl $(DATA_DIR)/music.txt
	@mkdir -p $(CACHE_DIR)
	./hwebs-info -page=music > $@

$(DIST_DIR)/etc/index.html: hwebs-info $(TEMPLATES_DIR)/layout.tmpl $(TEMPLATES_DIR)/now.tmpl $(CACHE_DIR)/music.html
	@mkdir -p $(DIST_DIR)/etc/
	./hwebs-info -page=etc > $@

# blog page
$(DIST_DIR)/blog/index.html: $(DATA_DIR)/posts.csv hwebs-info $(TEMPLATES_DIR)/blog.tmpl
	@mkdir -p $(DIST_DIR)/blog/
	./hwebs-info -page=blog > $@

# post pages 
POSTS := $(wildcard $(DATA_DIR)/posts/*.md)
POST_CACHE_HTML_FILES := $(patsubst $(DATA_DIR)/posts/%.md,$(CACHE_DIR)/posts/%.html,$(POSTS))
POST_DIST_HTML_FILES := $(patsubst $(DATA_DIR)/posts/%.md,$(DIST_DIR)/blog/post/%.html,$(POSTS))

$(CACHE_DIR)/posts/%.html: $(DATA_DIR)/posts/%.md
	@mkdir -p $(CACHE_DIR)/posts/
	pandoc $< -o $@

$(DIST_DIR)/blog/post/%.html: $(CACHE_DIR)/posts/%.html hwebs-info $(TEMPLATES_DIR)/layout.tmpl $(TEMPLATES_DIR)/post.tmpl
	@mkdir -p $(DIST_DIR)/blog/post/
	./hwebs-info -page=post -slug=$* > $@

# now page
$(CACHE_DIR)/github_response.json:
	./commits.sh > $@ || (rm -f $@; exit 1)

$(CACHE_DIR)/code.csv: $(CACHE_DIR)/github_response.json commits.jq
	# TODO error
	jq -rf commits.jq $< > $@

$(CACHE_DIR)/status.json:
	@mkdir -p $(CACHE_DIR)
	# TODO err
	curl -s https://status.cafe/users/henz/status.json > $@

$(CACHE_DIR)/commits.html: $(CACHE_DIR)/code.csv hwebs-info $(TEMPLATES_DIR)/commits.tmpl
	./hwebs-info -page=commits > $@

$(CACHE_DIR)/status.html: $(CACHE_DIR)/status.json
	./hwebs-info -page=status > $@

$(CACHE_DIR)/reading.xml:
	@mkdir -p $(CACHE_DIR)
	curl -sL -A "$$USER_AGENT" "https://www.goodreads.com/review/list_rss/159263337?key=qDjiqflyhso0h4tUk8bW2USB19csqQ3NW32j7SBIIf6FFVG8&shelf=currently-reading" > $@
	
$(CACHE_DIR)/reading.html: $(CACHE_DIR)/reading.xml hwebs-info $(TEMPLATES_DIR)/reading.tmpl
	./hwebs-info -page=reading > $@

$(CACHE_DIR)/watched.xml:
	@mkdir -p $(CACHE_DIR)
	curl -s "https://letterboxd.com/hwebs/rss/" > $@

$(CACHE_DIR)/watched.html: $(CACHE_DIR)/watched.xml hwebs-info $(TEMPLATES_DIR)/watched.tmpl
	./hwebs-info -page=watched > $@

#$(CACHE_DIR)/updates.html: $(DATA_DIR)/updates.csv hwebs-info $(TEMPLATES_DIR)/updates.tmpl
#	./hwebs-info -page=updates > $@

# TODO send in the dependencies as args
$(DIST_DIR)/now/index.html: $(CACHE_DIR)/commits.html $(CACHE_DIR)/status.html $(CACHE_DIR)/reading.html $(CACHE_DIR)/watched.html
	@mkdir -p $(DIST_DIR)/now/
	./hwebs-info -page=now > $@

docker-build:
	docker build -t hwebs-info .

docker-run:
	docker run -p 8080:80 --env-file .env hwebs-info

clean:
	rm -rf $(DIST_DIR)
	rm -rf $(CACHE_DIR)
	rm -f hwebs-info

clean-for-update:
	rm -f $(CACHE_DIR)/reading.xml
	rm -f $(CACHE_DIR)/watched.xml
	rm -f $(CACHE_DIR)/status.json
	rm -f $(CACHE_DIR)/commits.html

PAGES := $(DIST_DIR)/index.html \
	 $(DIST_DIR)/now/index.html \
	 $(DIST_DIR)/blog/index.html \
	 $(DIST_DIR)/etc/index.html

all: $(PAGES) $(DIST_DIR)/static $(POST_DIST_HTML_FILES)

format:
	gofmt -w web.go
	prettier --write "**/*.css"
	djlint --reformat --profile=golang $(TEMPLATES_DIR)/*.tmpl
	shfmt -w *.sh

.PHONY: serve all clean clean-for-update docker-build docker-run format
