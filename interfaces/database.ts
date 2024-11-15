import { ColumnType, Insertable, Selectable } from 'kysely';

export interface Database {
  quizzes: QuizTable;
  play_logs: PlayLogTable;
  users: UserTable;
}

export interface QuizTable {
  quiz_id: string;
  title: string;
  description?: string;
  created_by: string;
  prompt: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export type Quiz = Selectable<QuizTable>;
export type NewQuiz = Insertable<QuizTable>;
export type QuizUpdate = Insertable<QuizTable>;

export interface PlayLogTable {
  play_log_id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  correct_count: number;
  total_count: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type PlayLog = Selectable<PlayLogTable>;
export type NewPlayLog = Insertable<PlayLogTable>;
export type PlayLogUpdate = Insertable<PlayLogTable>;

export interface UserTable {
  user_id: string;
  name: string;
  description?: string;
  avatar: string;
  google_id: string;
  email: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Insertable<UserTable>;
