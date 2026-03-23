===============
MOVIE_NIGHT_APP
===============
- A simple app for storing possible movies to watch for movie night.
- With Voting system and watched film list.

---------------
STACK
---------------
- REACT 
- NEXT JS
- DOCKER
- MySql db
- SQL (No ORM)
- Tailwind / Daisy UI

---------------
PUBLIC APIS
---------------
- TMDB (The Movie Database)


---------------
FEATURES
---------------
 
 - Voting
 - Shortlist
 - Watched Movies [Done]
 - Users [Done]
 - Basic Film Info [Done]
 - Unwatched Movies

---------------
TO DO
---------------
- Get Database Data Connected to Pages. (movies) [Done]
- Make dummy data for DB [Done]
- Connect to movie database [Done]
- Add Watchlist [Done]
- Authentication (oAuth) [Done]
- Search function for API 
- Paginations (Date, Rating, Added By)
- ADD TV SHOWS ? We watched cabinet of curiosities


---------------
BUGS
---------------
- Foreign Film titles (due to original title being used?) break display and sort

---------------
IDEAS
---------------
- RANDOMIZER 
- VOTING SYSTEM
- GET MOVIE DATA FROM TMDB [Done]
- BASIC CRUD (ADD REMOVE FILMS)

- Use search - get movie from tmdb (name, year, basically all data)
- Add movie to SHORTLIST which can be movies table in database. [Done]
- Then just look up database to work with my data. [Done]
- Add to watched_movies [Done]


---------------
Testing
---------------

- Cypress or Playwright ?
- Linting 
- Prettier etc.
- Before PR submit do all checks (make a script)


---------------
Architecture / Cleanup
---------------

- Sort out types again (domain, db etc)
- Rename / Uniform Mapping for DBRows to used Data in app


---------------
MENTAL NOTES
---------------

<!-- CLIENT SIDE -->

React Component
      ↓
lib/api/movies.ts      (fetch wrapper)
      ↓
/api/movies            (Next.js route)
      ↓
lib/queries/movies.ts  (database queries)
      ↓
Database

<!-- SERVER SIDE -->

Server Component
      ↓
lib/queries
      ↓
Database