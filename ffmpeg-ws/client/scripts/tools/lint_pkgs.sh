#!/bin/bash
set -ex

cd ./packages

for file in *; do
    [ -d "$file" ] || continue

    if [ "$file" == "config" ]; then
        continue
    fi

    echo "cd $file";
    cd ./$file
    yarn run lint
    cd ..
done
