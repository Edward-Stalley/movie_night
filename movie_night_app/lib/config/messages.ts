export const messages = {
  success: {
    votes_session: { created: 'New Session Created!' },
    watched_movies: { added: 'Movie Added to Watched!', deleted: 'Watched Movie Deleted.' },
    movies: { added: 'Movie Added!', deleted: 'Movie Deleted.' },
  },
  errors: {
    unique: {
      vote_session: 'A movie night already exists for this date.',
      general: 'This item already exists.',
    },
    null: 'Required information is missing.',
    foreign_key: 'Referenced Movie: Cannot Delete',
    generic: {
      unexpected: 'Unexpected server error. Please try again.',
      general: 'Something went wrong',
    },
  },
};
