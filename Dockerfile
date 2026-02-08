FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod go.sum* ./

COPY web.go ./
RUN go build -o hwebs-info

FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache \
    supercronic \
    make \
    pandoc \
	darkhttpd \
	curl \
	nushell

COPY --from=builder /app/hwebs-info ./

COPY web.go ./
COPY Makefile ./
COPY templates/ ./templates/
COPY data/ ./data/
COPY scripts/ ./scripts/

ENV DATA_DIR=/app/data \
	CACHE_DIR=/app/.cache \
	TEMPLATES_DIR=/app/templates \
	DIST_DIR=/app/dist


# Copy crontab and startup script
COPY crontab /etc/crontabs/crontab
COPY start.sh /start.sh
RUN chmod +x /start.sh scripts/*.nu hwebs-info

EXPOSE 80

CMD ["/start.sh"]
