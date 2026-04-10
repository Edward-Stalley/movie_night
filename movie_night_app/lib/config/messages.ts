export const messages = {
  success: {
    votes_session: { created: 'New Session Created!' },
    watched_movies: { added: 'Movie Added to Watched.', deleted: 'Watched Movie Deleted!' },
  },
  errors: {
    unique: {
      vote_session: 'A movie night already exists for this date.',
      general: 'This item already exists.',
    },
    null: 'Required information is missing.',
    foreign_key: 'Required Data is missing',
    generic: {
      unexpected: 'Unexpected server error. Please try again.',
      general: 'Something went wrong',
    },
  },
};
