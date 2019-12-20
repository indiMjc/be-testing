
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickets', tbl => {
    tbl.increments(); // ticket number
    tbl.integer('user_id').notNullable().references('id').inTable('users');
    tbl.text('description', 500).notNullable();
    tbl.text('urgency').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tickets');
};
