#!/bin/sh

cd /app && make all

darkhttpd /app/dist --port 80 --addr 0.0.0.0 &

sleep 2

exec supercronic /etc/crontabs/crontab
