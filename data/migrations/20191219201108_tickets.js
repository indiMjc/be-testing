
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tickets', tbl => {
    tbl.increments(); // ticket number
    tbl.integer('user_id').notNullable().references('id').inTable('users'); // submitted by
    tbl.text('description', 500).notNullable();
    tbl.text('urgency').notNullable();
    tbl.text('reply', 500);
    tbl.boolean('solved').notNullable().defaultTo(0); // solved, defaults to false
    tbl.text('category', 128).notNullable();
    tbl.integer('solved_by').references('id').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tickets');
};
