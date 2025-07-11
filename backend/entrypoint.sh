#!/bin/sh

echo "Sqlite3: Seeding database"
sqlite3 db.sqlite < seed.sql

exec flask --app app run --host=0.0.0.0
