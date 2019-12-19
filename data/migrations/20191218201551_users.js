
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.text("username", 128).notNullable();
      tbl.text("password", 500).notNullable();
      tbl.text("type", 20).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
