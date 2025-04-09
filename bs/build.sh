#! /usr/bin/env sh

npx esbuild ./index.ts --bundle --format=esm --platform=browser --outfile=dist/bundle.js --target=esnext
