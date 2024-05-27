#!/bin/bash

VOLUME_NAME="nginx_data"
docker volume create $VOLUME_NAME

docker run -d -p 80:80 --name mynginx -v $VOLUME_NAME:/usr/share/nginx/html nginx
echo "<h1>Hello, World!</h1>" | tee $(docker volume inspect --format='{{.Mountpoint}}' $VOLUME_NAME)/index.html > /dev/null
