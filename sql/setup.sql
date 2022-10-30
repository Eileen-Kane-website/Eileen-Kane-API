-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
CREATE TABLE art_works (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	title TEXT NOT NULL,
	medium TEXT,
	dimensions TEXT,
	year TEXT,
	slug TEXT UNIQUE NOT NULL,
	is_featured BOOLEAN,
	series_id BIGINT
);

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
	first_name TEXT
);

CREATE TABLE series (
	id BIGINT GENERATED ALWAYS AS IDENTITY,
	name TEXT NOT NULL
);
