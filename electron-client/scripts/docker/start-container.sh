#!/bin/sh
NAME="m-fe-rtw"

git pull --rebase --prune

echo 'start build docker image.'
docker build -t ${NAME}:latest -f ./scripts/docker/Dockerfile dist

echo 'stop and remove the current container.'
docker container stop ${NAME}
docker container rm ${NAME}

echo 'run a new container.'
docker run -d --restart always -p 2015:2015 --name ${NAME} ${NAME}:latest
