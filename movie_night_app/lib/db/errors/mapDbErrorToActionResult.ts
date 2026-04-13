import { messages } from '@/lib/config/messages';
import { ActionResult } from '@/lib/types/actions';
import { actionError } from '@/lib/utils/messageHandling/actionResult';

export function mapDbErrorToActionResult(error: unknown): ActionResult<never> {
  console.error('DB ERROR:', error);
  const pgError = error as { code?: string; constraint?: string };
  // Unique constraint violations
  if (pgError.code === '23505') {
    switch (pgError.constraint) {
      case 'unique_movie_night_date':
        return actionError(messages.errors.unique.vote_session) as ActionResult<never>;

      default:
        return actionError(messages.errors.unique.general) as ActionResult<never>;
    }
  }

  // Foreign key violation
  if (pgError.code === '23503') {
    return actionError(messages.errors.foreign_key) as ActionResult<never>;
  }

  // Not null violation
  if (pgError.code === '23502') {
    return actionError(messages.errors.null) as ActionResult<never>;
  }

  // Fallback
  return actionError(messages.errors.generic.unexpected) as ActionResult<never>;
}
