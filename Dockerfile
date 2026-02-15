FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache \
    supercronic \
    make \
    pandoc \
	darkhttpd \
	nushell \
	gomplate \
	recode

COPY Makefile ./
COPY templates/ ./templates/
COPY data/ ./data/
COPY scripts/ ./scripts/

ENV DATA_DIR=/app/data \
	CACHE_DIR=/app/.cache \
	TEMPLATES_DIR=/app/templates \
	DIST_DIR=/app/dist

COPY crontab /etc/crontabs/crontab
COPY start.sh /start.sh
RUN chmod +x /start.sh scripts/*.nu

EXPOSE 80

CMD ["/start.sh"]
