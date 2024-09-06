import { createKysely } from '@vercel/postgres-kysely';
import { defineConfig } from 'kysely-ctl';

export default defineConfig({
  kysely: createKysely(),
});
