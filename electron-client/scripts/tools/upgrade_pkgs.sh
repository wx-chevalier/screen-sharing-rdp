#!/bin/bash
set -ex

ncu -u

(cd ./packages/rte-core && ncu -u)
(cd ./packages/rte-bootstrap && ncu -u)
(cd ./packages/rte-host-app && ncu -u)
(cd ./packages/rte-mobx-app && ncu -u)
