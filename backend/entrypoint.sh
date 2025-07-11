#!/bin/sh

echo "Sqlite3: Seeding database"
sqlite3 db.sqlite < seed.sql

# Executa o Flask
exec flask --app app run --host=0.0.0.0
