const db = require("../../data/db");

// returns list of all users
function find() {
  return db("users").select("id", "username");
}

// select user by filter
function findBy(username){
    return db("users").where({ username: username }).first();
}

// adds new user
function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return db("users");
    });
}

module.exports = {
    find,
    findBy,
    add
}