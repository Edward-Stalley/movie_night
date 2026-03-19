import { LoggedInUser, MovieBase, StoredMovie, User, WatchedMovie } from '@/lib/types/domain';
import { QueryParams } from './db';
import {
  MovieSortValue,
  SortOption,
  SortOrder,
  WatchedMovieSortValue,
} from '@/lib/types/pagination';
import { SearchParams } from 'next/dist/server/request/search-params';

export type MoviePoster = Pick<MovieBase, 'posterPath' | 'originalTitle'> & {
  id?: number;
  urlRoute?: string;
};

export type MovieDeleteHandler = () => void;

export type WatchedMovieAddHandler = () => void;

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
  onAdd: MovieDeleteHandler;
  isDetailScreen: IsDetailScreen;
}

export interface GridOrListProps {
  children: React.ReactNode;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  headerTitle: string;
  pagination: PaginationProps;
  sortOptions: SortOption[];
  sortValue: string;
  sortOrder: SortOrder;
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

export interface MovieCardProps {
  movie: StoredMovie;
  layout?: Layout;
  isDetailScreen?: boolean;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  sort: string;
  order: SortOrder;
}
