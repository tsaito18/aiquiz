import { ColumnType, Insertable, Selectable } from 'kysely';

export interface Database {
  users: UserTable;
}

export interface UserTable {
  user_id: string;
  username: string;
  email: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Insertable<UserTable>;
