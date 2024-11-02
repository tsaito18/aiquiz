import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('quizzes')
    .addColumn('quiz_id', 'uuid', (col) => col.primaryKey())
    .addColumn('title', 'varchar(50)', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('created_by', 'uuid', (col) => col.notNull())
    .addColumn('prompt', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('quizzes').execute();
}
