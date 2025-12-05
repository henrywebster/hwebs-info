DATA_DIR ?= data
CACHE_DIR ?= .cache
DIST_DIR ?= dist
TEMPLATES_DIR ?= templates

# TODO 
# * add templates in appropriate places
# * use .env

serve:
	darkhttpd $(DIST_DIR)

STATIC_SOURCES := $(shell find $(DATA_DIR)/static -type f)

$(DIST_DIR)/static: $(STATIC_SOURCES)
	@mkdir -p $(DIST_DIR)
	cp -r $(DATA_DIR)/static $@

# home page
$(CACHE_DIR)/%.html: $(DATA_DIR)/%.md
	@mkdir -p $(CACHE_DIR)
	pandoc $< -o $@

$(CACHE_DIR)/index.html: $(CACHE_DIR)/hello.html $(CACHE_DIR)/why.html
	go run web.go > $@ || (rm -f $@; exit 1)

$(DIST_DIR)/index.html: $(CACHE_DIR)/index.html
	@mkdir -p $(DIST_DIR)
	ln $< $@

# etc page
$(DIST_DIR)/etc/index.html: $(TEMPLATES_DIR)/layout.tmpl
	@mkdir -p $(DIST_DIR)/etc/
	go run web.go -page=etc > $@

# blog page
$(DIST_DIR)/blog/index.html: $(DATA_DIR)/posts.csv web.go $(TEMPLATES_DIR)/blog.tmpl
	@mkdir -p $(DIST_DIR)/blog/
	go run web.go -page=blog > $@

# post pages 
POSTS := $(wildcard $(DATA_DIR)/posts/*.md)
POST_CACHE_HTML_FILES := $(patsubst $(DATA_DIR)/posts/%.md,$(CACHE_DIR)/posts/%.html,$(POSTS))
POST_DIST_HTML_FILES := $(patsubst $(DATA_DIR)/posts/%.md,$(DIST_DIR)/blog/post/%.html,$(POSTS))

$(CACHE_DIR)/posts/%.html: $(DATA_DIR)/posts/%.md
	@mkdir -p $(CACHE_DIR)/posts/
	pandoc $< -o $@

$(DIST_DIR)/blog/post/%.html: $(CACHE_DIR)/posts/%.html web.go $(TEMPLATES_DIR)/layout.tmpl $(TEMPLATES_DIR)/post.tmpl
	@mkdir -p $(DIST_DIR)/blog/post/
	go run web.go -page=post -slug=$* > $@

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

$(CACHE_DIR)/commits.html: $(CACHE_DIR)/code.csv web.go $(TEMPLATES_DIR)/commits.tmpl
	go run web.go -page=commits > $@

$(CACHE_DIR)/status.html: $(CACHE_DIR)/status.json
	go run web.go -page=status > $@

$(CACHE_DIR)/reading.xml:
	@mkdir -p $(CACHE_DIR)
	# TODO make user-agent a variable
	curl -sL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "https://www.goodreads.com/review/list_rss/159263337?key=qDjiqflyhso0h4tUk8bW2USB19csqQ3NW32j7SBIIf6FFVG8&shelf=currently-reading" > $@
	
$(CACHE_DIR)/reading.html: $(CACHE_DIR)/reading.xml
	go run web.go -page=reading > $@

$(CACHE_DIR)/watched.xml:
	@mkdir -p $(CACHE_DIR)
	curl -s "https://letterboxd.com/hwebs/rss/" > $@

$(CACHE_DIR)/watched.html: $(CACHE_DIR)/watched.xml web.go $(TEMPLATES_DIR)/watched.tmpl
	go run web.go -page=watched > $@

# TODO send in the dependencies as args
$(DIST_DIR)/now/index.html: $(CACHE_DIR)/commits.html $(CACHE_DIR)/status.html $(CACHE_DIR)/reading.html $(CACHE_DIR)/watched.html
	@mkdir -p $(DIST_DIR)/now/
	go run web.go -page=now > $@

PAGES := $(DIST_DIR)/index.html \
	 $(DIST_DIR)/now/index.html \
	 $(DIST_DIR)/blog/index.html \
	 $(DIST_DIR)/etc/index.html

all: $(PAGES) $(DIST_DIR)/static $(POST_DIST_HTML_FILES)

.PHONY: serve all
