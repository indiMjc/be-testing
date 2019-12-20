const db = require("../../data/db");

// returns list of all users
function find() {
  return db("users").select("id", "username", "type")
  // innerJoin('tickets', 'users.id', '=', 'tickets.user_id').select("users.id", "users.username", { tickets });
}

// select user by filter
function findBy(username){
    return db("users").where({ username: username }).first();
}

// adds new user
function add(user) {
  return db("users").insert(user).returning(["id", "username", "type"]);
}

// removes user
function removeUser(id){
  return db('users').where({ id }).delete("*");
}

module.exports = {
    find,
    findBy,
    add,
    removeUser
}