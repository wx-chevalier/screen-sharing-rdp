#!/bin/bash
#
# Gitlab CI 项目镜像构建
#
# Gitlab CI 预定义变量：
#   https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
#
# Globals:
#   CI_COMMIT_TAG: 当前提交的 tag
#   CI_COMMIT_SHA: 当前提交的 commit sha
#   CI_COMMIT_REF_NAME: 当前提交的 ref name (branch/tag)
#
# 测试：
#   CI_COMMIT_TAG=<tag> ./build-on-gitlab.sh
#   CI_COMMIT_SHA=<sha> CI_COMMIT_REF_NAME=dev ./build-on-gitlab.sh

# 切入项目根目录
cd $(dirname $0)/../..

DOCKERFILE=${DOCKERFILE:=scripts/docker/Dockerfile.gitlab}
IMAGE=${IMAGE}
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

#######################################
# 构建 tag 了的 commit 的镜像并推送
#
# Globals:
#   CI_COMMIT_TAG
#   IMAGE
#   DOCKERFILE
#######################################
build_tag() {
	echo "[1/2] Building ${IMAGE}:${CI_COMMIT_TAG}"
	docker build -t ${IMAGE}:${CI_COMMIT_TAG} -f ${DOCKERFILE} .

	echo "[2/2] Pushing ${IMAGE}:${CI_COMMIT_TAG}"
	docker push ${IMAGE}:${CI_COMMIT_TAG}
}

#######################################
# 在 master 分支构建 rc 镜像，tag 为 package.json 版本
#
# Globals:
#   CHART_VERSION
#   IMAGE
#   DOCKERFILE
#######################################
build_master() {
	local image_tag=v${PACKAGE_VERSION}-rc
	echo "[1/2] Building ${IMAGE}:${image_tag}"
	docker build -t ${IMAGE}:${image_tag} -f ${DOCKERFILE} .

	echo "[2/2] Pushing ${IMAGE}:${image_tag}"
	docker push ${IMAGE}:${image_tag}
}

#######################################
# 构建 dev 分支镜像，将构建 COMMIT_SHA 和 latest 两个 tag 的镜像
#
# Globals:
#   CI_COMMIT_SHA
#   IMAGE
#   DOCKERFILE
#######################################
build_dev() {
	echo "[1/3] Building ${IMAGE}:${CI_COMMIT_SHA} $IMAGE:latest"
	docker build -t ${IMAGE}:${CI_COMMIT_SHA} -t ${IMAGE}:latest -f ${DOCKERFILE} . || return $?

	echo "[2/3] Pushing ${IMAGE}:latest"
	docker push ${IMAGE}:latest || return $?

	# echo "[3/3] Pushing ${IMAGE}:${CI_COMMIT_SHA}"
	# docker push ${IMAGE}:${CI_COMMIT_SHA} || return $?
}

#######################################
# 非 dev/master 且未 tag 的 commit 生成该分支的镜像
#
# Globals:
#   CI_COMMIT_REF_NAME
#   IMAGE
#   DOCKERFILE
#######################################
build_other_branch() {
	local tag=$(echo ${CI_COMMIT_REF_NAME} | sed 's/\//-/g')

	echo "[1/2] Building ${IMAGE}:${tag}"
	docker build -t ${IMAGE}:${tag} -f ${DOCKERFILE} . || return $?

	echo "[2/2] Pushing ${IMAGE}:${tag}"
	docker push ${IMAGE}:${tag} || return $?
}

case ${CI_COMMIT_REF_NAME} in
dev)
	echo "Build on dev branch"
	build_dev
	;;
master)
	echo "Build on master branch"
	build_master
	;;
*)
	if [[ ! -z ${CI_COMMIT_TAG} ]]; then
		echo "Build tag ${CI_COMMIT_TAG}"
		build_tag
	else
		if [[ ! -z ${CI_COMMIT_REF_NAME} ]]; then
			echo "Build on ${CI_COMMIT_REF_NAME} branch"
			build_other_branch
		fi
	fi
	;;
esac
