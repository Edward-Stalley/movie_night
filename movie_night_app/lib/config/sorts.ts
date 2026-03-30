export const SORT_OPTIONS_WATCHED_MOVIES = [
  { value: 'title', label: 'Title' },
  { value: 'watchedOn', label: 'Watched Date' },
  { value: 'chosenBy', label: 'Chosen By' },
];

export const SORT_OPTIONS_MOVIES = [
  { value: 'title', label: 'Title' },
  { value: 'addedBy', label: 'Added By' },
  { value: 'addedOn', label: 'Added On' },
];

export const SORT_OPTIONS_SEARCHED_MOVIES = [
  { value: 'title', label: 'Title' },
  { value: 'releaseDate', label: 'Release Date' },
];

export const MOVIE_SORT_MAP = {
  addedBy: 'm.added_by',
  releaseDate: 'm.release_date',
  title: 'm.title',
  addedOn: 'm.added_on',
};