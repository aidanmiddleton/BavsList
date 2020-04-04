create table users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL
);

CREATE table favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_favourite BOOLEAN NOT NULL DEFAULT FALSE
);

create table listings (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER REFERENCES users(id) ON CASCADE DELETE,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL,
	date_created DATE NOT NULL,
	date_sold DATE,
	price INTEGER NOT NULL DEFAULT 0,
	behaviour VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL
);
