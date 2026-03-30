===============
MOVIE_NIGHT_APP
===============

- A simple app for storing possible movies to watch for movie night.
- With Voting system and watched film list.

---

## STACK

- [REACT]
- [NEXT_JS]
- [DOCKER]
- [MySql_db]
- [SQL_(No_ORM)]
- [Tailwind_/Daisy_UI]

---

## PUBLIC APIS

- TMDB (The Movie Database) [Connected]

---

## FEATURES

- Movies [Done]
- Users [Done]
- Watched Movies [Done]
- Basic Film Info [Done]
- Voting [Done]
- Shortlist [Done]

---

## TO DO

- Get Database Data Connected to Pages. (movies) [Done]
- Make dummy data for DB [Done]
- Connect to movie database [Done]
- Add Watchlist [Done]
- Authentication (oAuth) [Done]
- Search function for API [Done]
- Paginations (Date, Rating, Added By) [Done] \* except Rating
- ADD TV SHOWS ? We watched cabinet of curiosities
- Change all 'interface' to 'type' for typescript. [Done]

- Randomise or new vote for when multiple movies 'win' vote.
- Edit vote session?
- change sql to postgres? This may be needed for free db hosting.
- upload to vercel
- explore AWS as an option? New account for 1 year free.

---

## BUGS

- Foreign Film titles (due to original title being used?) break display and sort [in_progress]

---

## IDEAS

- RANDOMIZER
- VOTING SYSTEM [Done]
- GET MOVIE DATA FROM TMDB [Done]
- BASIC CRUD (ADD REMOVE FILMS) [Done]

- Use search - get movie from tmdb (name, year, basically all data) [Done]
- Add movie to SHORTLIST which can be movies table in database. [Done]
- Then just look up database to work with my data. [Done]
- Add to watched_movies [Done]
- Add 'already seen' for movies list films / voting films [Done]

---

## Testing

- Cypress or Playwright ?
- Linting
- Prettier etc.
- Before PR submit do all checks (make a script)

---

## Architecture / Cleanup

- Sort out types again (domain, db etc)
- Rename / Uniform Mapping for DBRows to used Data in app

---

## MENTAL NOTES

<!-- CLIENT SIDE -->

React Component
↓
lib/api/movies.ts (fetch wrapper)
↓
/api/movies (Next.js route)
↓
lib/queries/movies.ts (database queries)
↓
Database

<!-- SERVER SIDE -->

Server Component
↓
lib/queries
↓
Database
