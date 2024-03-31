#!/bin/bash

DB_URL=$(grep POSTGRES_DB_URL .env.test | cut -d '=' -f2)
DB_NAME=code-sync_test

if psql -lqt | cut -d \| -f 1 | grep $DB_NAME; then
  dropdb $DB_NAME
fi

createdb $DB_NAME

# So that we can run relative to packages/db directory
cd "$(dirname "$0")"
cd ..

export POSTGRES_DB_URL=$DB_URL

npx prisma generate

npx prisma db push

npx tsx seeds/seed.ts
