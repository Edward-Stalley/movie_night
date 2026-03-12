// lib/auth.ts
import { LoggedInUser } from '@/lib/types/domain';
import { Session } from 'next-auth';

export function mapSessionToLoggedInUser(session: Session | null): LoggedInUser | undefined {
  if (!session?.user) return undefined;
  return {
    id: session.user.id,
    name: session.user.name ?? 'Unknown',
    image: session.user.image ?? '',
  };
}
