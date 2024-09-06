import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('user_id', 'uuid', (col) => col.primaryKey())
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('avatar', 'varchar', (col) => col.notNull())
    .addColumn('google_id', 'varchar(50)', (col) => col.unique().notNull())
    .addColumn('email', 'varchar', (col) => col.unique().notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('user_google_id_unique_index')
    .on('user')
    .column('google_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
}
