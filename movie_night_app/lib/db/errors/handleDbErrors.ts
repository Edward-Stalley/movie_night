import { messages } from '@/lib/config/messages';

export type ActionResult<T> = { success: true; data: T } | { success: false; message: string };

export function handleDbError(error: any): ActionResult<never> {
  console.error('DB ERROR:', error);
  // Unique constraint violations
  if (error.code === '23505') {
    console.log('error in handler,', error.constraint);
    switch (error.constraint) {
      case 'unique_movie_night_date':
        return {
          success: false,
          message: messages.errors.unique.vote_session,
        };

      default:
        return {
          success: false,
          message: messages.errors.unique.general,
        };
    }
  }

  // Foreign key violation
  if (error.code === '23503') {
    return {
      success: false,
      message: 'Related data is missing.',
    };
  }

  // Not null violation
  if (error.code === '23502') {
    return {
      success: false,
      message: 'Required information is missing.',
    };
  }

  // Fallback
  return {
    success: false,
    message: messages.errors.generic.unexpected,
  };
}
