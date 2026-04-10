import {
  LoggedInUser,
  User,
  SearchedMovie,
  WatchedMovie,
  MovieBase,
  StoredMovie,
  VoteSession,
} from '@/lib/types/domain';
import {
  MovieSortValue,
  SearchedMovieSortValue,
  SortOption,
  SortOrder,
  WatchedMovieSortValue,
} from '@/lib/types/sort';

export type MoviePoster = Pick<MovieBase, 'posterPath' | 'title' | 'trailerUrl'> & {
  id?: number;
  urlRoute?: string;
  selected?: boolean;
  className?: string;
  disableLink?: boolean;
  priority?: boolean;
};

export type MovieDeleteHandler = () => void;

export type MovieAddHandler = () => void;

export type WatchedMovieAddHandler = () => void;

export type SearchedMovieAddHandler = () => void;

export type IsDetailScreen = boolean;

export type Layout = 'grid' | 'list';

// -------------
// PROPS
// -------------

export type IconClassNameProps = {
  className?: string;
  fill?: string;
};

export type StarRatingProps = {
  rating: number | null | undefined;
  max?: number;
  onClick?: (rating: number) => void;
  isEditing: boolean;
};

export type WatchedMovieCardProps = {
  movie: WatchedMovie;
  layout: string | null;
  loggedInUser?: LoggedInUser;
  users: User[];
  isDetailScreen: boolean;
};

export type IconProps = React.SVGProps<SVGSVGElement>;

export type DeleteMovieButtonProps = {
  onDelete: MovieDeleteHandler;
  isDetailScreen: IsDetailScreen;
};

export type AddWatchedMovieButtonProps = {
  onAdd: MovieAddHandler;
  isDetailScreen: IsDetailScreen;
};

export type AddSearchedMovieButtonProps = {
  onAdd: SearchedMovieAddHandler; // CHECK delete should be add?
  isDetailScreen: IsDetailScreen;
};

export type GridOrListProps = {
  children: React.ReactNode;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  canToggleLayout?: boolean;
  headerTitle: string;
  pagination?: PaginationProps;
  sortOptions: SortOption[];
  sortValue: string;
  sortOrder: SortOrder;
};

export type SearchedMovieGridOrListProps = {
  children?: React.ReactNode;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  headerTitle: string;
  pagination?: PaginationProps;
  sortOptions?: SortOption[];
  sortValue?: string;
  sortOrder?: SortOrder;
};

export type WatchedMoviesLayoutProps = {
  movies: WatchedMovie[];
  loggedInUser?: LoggedInUser;
  users: User[];
  pagination: PaginationProps;
  sortValue: WatchedMovieSortValue;
  sortOrder: SortOrder;
};

export type MoviesLayoutProps = {
  movies: StoredMovie[];
  loggedInUser?: LoggedInUser;
  pagination: PaginationProps;
  sortValue: MovieSortValue;
  sortOrder: SortOrder;
};

export type VoteMoviesLayoutProps = {
  movies: StoredMovie[];
  loggedInUser?: LoggedInUser;
  users: User[];
  createdBy: User;
  voteSession: VoteSession;
  votesByMovie: VoteByMovie[];
};

export type Vote = {
  id: number;
  voteSessionId: number;
  userId: number;
  movieId: number;
};

export type VoteByMovie = {
  count: number;
  movieId: number;
  users: User[];
};

export type CreateVotingSessionLayoutProps = {
  movies: StoredMovie[];
  loggedInUser?: LoggedInUser;
  pagination: PaginationProps;
  sortValue: MovieSortValue;
  sortOrder: SortOrder;
  selectedMovies: StoredMovie[];
};

export type SearchedMoviesLayoutProps = {
  movies: SearchedMovie[];
  loggedInUser?: LoggedInUser;
  pagination?: PaginationProps;
  sortValue: SearchedMovieSortValue;
  sortOrder: SortOrder;
  emptyState?: boolean;
};

export type SearchedMovieCardProps = {
  movie: SearchedMovie;
  layout: string | null;
  loggedInUser?: LoggedInUser;
  isDetailScreen: boolean;
};
export type MovieCardProps = {
  movie: StoredMovie;
  layout?: Layout;
  isDetailScreen?: boolean;
  index?: number;
};

export type VoteMovieCardCardProps = {
  movie: StoredMovie;
  layout?: Layout;
  isDetailScreen?: boolean;
  CreateVotingSessionProps?: CreateVotingSessionProps;
  VotingSessionProps?: VotingSessionProps;
};
export type CreateVotingSessionProps = {
  selectable?: boolean;
  selected?: boolean;
  toggleSelect?: (movie: StoredMovie) => void;
};

export type VotingSessionProps = {
  status: string;
  toggleVote?: (id: number) => void;
  canVote: boolean;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
};

export type SortProps = {
  options: { label: string; value: string }[];
  value: string;
  order: SortOrder;
};

export type ToolbarProps = {
  layout: Layout;
  setLayout: (layout: Layout) => void;
  pagination: PaginationProps;
  sortOptions: SortProps['options'];
  sortValue: string;
  sortOrder: SortOrder;
  canToggleLayout?: boolean;
};
