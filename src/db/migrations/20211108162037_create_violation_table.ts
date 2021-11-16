import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("violations", (table) => {
    table.string("id").primary();
    table.string("license").notNullable;
    table.string("address").notNullable;
    table.string("violation").notNullable;
    table.boolean("deleted").defaultTo('false').notNullable();
    table.timestamp("created_at").notNullable;
    table.timestamp("updated_at").notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("violations");
}
