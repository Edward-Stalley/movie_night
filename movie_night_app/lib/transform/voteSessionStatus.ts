import { VoteSessionStatus as DbStatus } from '@/lib/types/db';
import { VoteSessionStatus as DomainStatus } from '@/lib/types/domain';

export function mapStatusToDomain(status: DbStatus): DomainStatus {
  switch (status) {
    case 'in_progress':
      return 'inProgress';
    case 'completed':
      return 'completed';
  }
}

export function mapStatusToDb(status: DomainStatus): DbStatus {
  switch (status) {
    case 'inProgress':
      return 'in_progress';
    case 'completed':
      return 'completed';
  }
}
