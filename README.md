# pg-promise

just a little playground for pg-promise with a local PostgreSQL database.

Following the recording of a bootcamp session, you can find the video: [here](https://www.youtube.com/watch?v=tgYztVxL41Y&t=1519s), made by [Corey Ladovsky](https://www.youtube.com/channel/UCkCuq-_XbZzezEzyZQuIENg)

videos

-   [Intro to PG Promise](https://www.youtube.com/watch?v=tgYztVxL41Y&t=1519s)
-   [PG Promise Conitinued](https://www.youtube.com/watch?v=NRlwLIlhUPE&t=259s)
-   [PG Promise Continued Part 2](https://www.youtube.com/watch?v=MFy0gSGWy98&t=17s)
-   [PG Promise Continued Part 3](https://www.youtube.com/watch?v=N8vXHUxb2bQ&t=2s)

## How to start

```node
git clone git@github.com:AlexisRoe/pg-promise.git
cd pg-promise
npm install
```

create a .env.json file

```json
{
    "DEFAULT_PORT": 3000,
    "CONFIG": {
        "USER": "username",
        "PASSWORD": "password",
        "HOST": "localhost",
        "PORT": 5432,
        "DATABASE": "grovers_groomers",
        "MAX": 30
    },
    "RECONNECT": {
        "TRIES": 10,
        "TIMETOWAIT": 5000,
        "LISTENER": 1000
    }
}
```

create the database using the schema

```node
\i < userPath > /pg-promise/bd / schema.sql;
```

starting the backend

```node
npm run dev
```

## database schema

source: https://github.com/joinpursuit/6.4-lecture-notes/blob/master/UNIT3/introToSQLTables/schema.sql

```sql
DROP DATABASE IF EXISTS grovers_groomers;
CREATE DATABASE grovers_groomers;

\c grovers_groomers;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pets;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    age INTEGER
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    species TEXT,
    age INTEGER,
    owner_id INT REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO users (name, age)
    VALUES ('corsky', 100),
            ('jon', 26),
            ('jhenya', 21),
            ('celine', 29),
            ('jerry', 69);

    INSERT INTO pets (name, species, age, owner_id)
        VALUES ('Noboru', 'Cat', 14, 1),
                ('Hatchi', 'Cat', 10, 1),
                ('Snowball', 'Cat', 12, 3),
                ('Gruffy', 'Dog', 6, 2),
                ('Coco', 'Dog', 3, 5),
                ('Rosco', 'Cat', 19, NULL);
```
