#!/bin/bash

# check if doc files changes for netlify
# needed because we cannot use && in netlify.toml

git diff --quiet 'HEAD^' HEAD ./docs/ && ! git diff 'HEAD^' HEAD ./pnpm-lock.yaml | grep --quiet vite