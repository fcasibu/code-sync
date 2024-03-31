#!/bin/bash

DB_NAME=code-sync_test

if psql -lqt | cut -d \| -f 1 | grep $DB_NAME; then
  dropdb $DB_NAME
fi
