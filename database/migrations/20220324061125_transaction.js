/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transaction', (table) => {
    table.increments('id').primary();
    table.string('sender').references('account_no').inTable('user').onDelete('CASCADE');
    table.string('receiver').references('account_no').inTable('user').onDelete('CASCADE');
    table.string('description').nullable();
    table.decimal('amount').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transaction');
};
