#!/bin/sh

cd /app && make all

darkhttpd /app/dist \
	--daemon \
	--addr 0.0.0.0 \
	--port 80 \
	--no-listing

exec supercronic /etc/crontabs/crontab
