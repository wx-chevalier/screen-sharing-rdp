#!/usr/bin/env bash
#
# 本地构建并推送项目镜像
#
# Globals:
#  DOCKER_REGISTRY_SERVER
#  TAG

set -e

cd $(dirname $0)/../..

DOCKER_REGISTRY_SERVER=${DOCKER_REGISTRY_SERVER:=registry.mybiz.com}
IMAGE=${DOCKER_REGISTRY_SERVER}/m-fe-web-client
TAG=${TAG:=latest}

yarn build

echo "[*] Finished building"

docker build --tag $IMAGE:$TAG -f scripts/docker/Dockerfile.local ./build

echo "[*] Pushing $IMAGE:$TAG"

docker push $IMAGE:$TAG
