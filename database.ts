import { Database } from '@/interfaces/database';
import { createKysely } from '@vercel/postgres-kysely';

export const db = createKysely<Database>({
  connectionString: process.env.POSTGRES_URL,
});
