# Issue handling

## Prerequisites

- Install NodeJS LTS version (14 or higher)
- Install ``TypeScript`` globally
- Install ``PostgreSQL`` (9.5 or higher)

CREATE DATABASE pgboss;
CREATE user postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE pgboss to postgres;
-- run the following command in the context of the pgboss database
CREATE EXTENSION pgcrypto;

## Setup

- Create your own `.env` files from `.env.example`
- To migrate database `npm run migrate`
- To seed database `npm run seed`
- To start APP in debug mode `npm run debug`