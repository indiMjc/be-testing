const db = require("../../data/db");

// returns list of all users
function find() {
  return db("users").select("id", "username");
}

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return db("users");
    });
}

module.exports = {
    find, 
    add
}