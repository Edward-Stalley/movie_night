import { User } from '@/lib/types/domain';

export default function getUserFromId(userId: number, users: User[]): User {
  const user = users.find((user) => Number(user.id) === userId);
  if (!user) throw new Error(`User with ID ${userId} not found`);
  return user;
}
