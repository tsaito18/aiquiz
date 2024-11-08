import { User } from '@/interfaces/database';

export interface Session {
  isLoggedIn: boolean;
  user: User | null;
}
