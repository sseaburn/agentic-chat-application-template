#!/bin/bash
set -e
npm install
npx next build
exec npx next start -H 0.0.0.0 -p ${APP_PORT:-3000}
