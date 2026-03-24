import {
  LoggedInUser,
  MovieBase,
  SearchedMovie,
  StoredMovie,
  User,
  WatchedMovie,
} from '@/lib/types/domain';
import { QueryParams } from './db';
import {
  MovieSortValue,
  SearchedMovieSortValue,
  SortOption,
  SortOrder,
  WatchedMovieSortValue,
} from '@/lib/types/pagination';
import { SearchParams } from 'next/dist/server/request/search-params';

export type MoviePoster = Pick<MovieBase, 'posterPath' | 'title'> & {
  id?: number;
  urlRoute?: string;
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

export interface IconClassNameProps {
  className?: string;
  fill?: string;
}

export interface StarRatingProps {
  rating: number | null | undefined;
  max?: number;
  onClick?: (rating: number) => void;
  isEditing: boolean;
}

export interface WatchedMovieCardProps {
  movie: WatchedMovie;
  layout: string | null;
  loggedInUser?: LoggedInUser;
  users: User[];
  isDetailScreen: boolean;
}

export type IconProps = React.SVGProps<SVGSVGElement>;

export interface DeleteMovieButtonProps {
  onDelete: MovieDeleteHandler;
  isDetailScreen: IsDetailScreen;
}

export interface AddWatchedMovieButtonProps {
  onAdd: MovieAddHandler;
  isDetailScreen: IsDetailScreen;
}

export interface AddSearchedMovieButtonProps {
  onAdd: SearchedMovieAddHandler; // CHECK delete should be add?
  isDetailScreen: IsDetailScreen;
}

export interface GridOrListProps {
  children: React.ReactNode;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  headerTitle: string;
  pagination?: PaginationProps;
  sortOptions: SortOption[];
  sortValue: string;
  sortOrder: SortOrder;
}

export interface SearchedMovieGridOrListProps {
  children?: React.ReactNode;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  headerTitle: string;
  pagination?: PaginationProps;
  sortOptions?: SortOption[];
  sortValue?: string;
  sortOrder?: SortOrder;
}

export interface WatchedMoviesLayoutProps {
  movies: WatchedMovie[];
  loggedInUser?: LoggedInUser;
  users: User[];
  pagination: PaginationProps;
  sortValue: WatchedMovieSortValue;
  sortOrder: SortOrder;
}

export interface MoviesLayoutProps {
  movies: StoredMovie[];
  loggedInUser?: LoggedInUser;
  pagination: PaginationProps;
  sortValue: MovieSortValue;
  sortOrder: SortOrder;
}

export interface SearchedMoviesLayoutProps {
  movies: SearchedMovie[];
  loggedInUser?: LoggedInUser;
  pagination?: PaginationProps;
  sortValue: SearchedMovieSortValue;
  sortOrder: SortOrder;
  emptyState?: boolean;
}

export interface SearchedMovieCardProps {
  movie: SearchedMovie;
  layout: string | null;
  loggedInUser?: LoggedInUser;
  // users: User[];
  isDetailScreen: boolean;
}
export interface MovieCardProps {
  movie: StoredMovie;
  layout?: Layout;
  isDetailScreen?: boolean;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  // sort: string;
  // order: SortOrder;
}
