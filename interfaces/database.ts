import { ColumnType, Insertable, Selectable } from 'kysely';

export interface Database {
  user: UserTable;
}

export interface UserTable {
  user_id: string;
  name: string;
  avatar: string;
  google_id: string;
  email: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Insertable<UserTable>;
