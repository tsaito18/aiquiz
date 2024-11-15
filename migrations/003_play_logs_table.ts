import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('play_logs')
    .addColumn('play_log_id', 'uuid', (col) => col.primaryKey())
    .addColumn('user_id', 'uuid', (col) =>
      col.references('users.user_id').onDelete('cascade').notNull(),
    )
    .addColumn('quiz_id', 'uuid', (col) =>
      col.references('quizzes.quiz_id').onDelete('cascade').notNull(),
    )
    .addColumn('score', 'integer', (col) => col.notNull())
    .addColumn('correct_count', 'integer', (col) => col.notNull())
    .addColumn('total_count', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('play_log_user_id_index')
    .on('play_logs')
    .column('user_id')
    .column('quiz_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('play_logs').execute();
}
