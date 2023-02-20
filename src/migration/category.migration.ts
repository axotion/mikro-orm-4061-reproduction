import { Migration } from '@mikro-orm/migrations';

export class CategoryMigration extends Migration {
  async up(): Promise<void> {
    this.addSql(
      this.getKnex()
        .schema.createTable('category', (table) => {
          table.increments().primary();
          table.string('name').notNullable();
          table.integer('parent_id').nullable().unsigned();
        })
        .toQuery(),
    );
  }
}
