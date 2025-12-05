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
    jq \
    pandoc \
	darkhttpd \
	curl

COPY --from=builder /app/hwebs-info ./

COPY web.go ./
COPY Makefile ./
COPY templates/ ./templates/
COPY data/ ./data/
COPY commits.sh ./
COPY commits.jq ./

ENV DATA_DIR=/app/data \
	CACHE_DIR=/app/.cache \
	TEMPLATES_DIR=/app/templates \
	DIST_DIR=/app/dist


# Copy crontab and startup script
COPY crontab /etc/crontabs/crontab
COPY start.sh /start.sh
RUN chmod +x /start.sh commits.sh hwebs-info

EXPOSE 80

CMD ["/start.sh"]
