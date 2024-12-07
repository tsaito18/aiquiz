import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('quizzes')
    .addColumn('play_count', 'integer', (col) => col.defaultTo(0))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('quizzes').dropColumn('play_count').execute();
}
