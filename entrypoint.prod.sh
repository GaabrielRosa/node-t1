#!/bin/bash

npm install

npm run migration:up:prod

node dist/shared/infra/http/index.js