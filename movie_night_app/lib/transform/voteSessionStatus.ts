import { VoteSessionStatusDB as DbStatus } from '@/lib/types/db';
import { VoteSessionStatusDomain as DomainStatus } from '@/lib/types/domain';

export function mapStatusToDomain(status: DbStatus): DomainStatus {
  switch (status) {
    case 'in_progress':
      return 'inProgress';
    case 'completed':
      return 'completed';
    case 'tie_breaker':
      return 'tieBreaker';
  }
}

export function mapStatusToDb(status: DomainStatus): DbStatus {
  switch (status) {
    case 'inProgress':
      return 'in_progress';
    case 'completed':
      return 'completed';
    case 'tieBreaker':
      return 'tie_breaker';
  }
}
