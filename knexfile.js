require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: './data/db/devdesk.db3',
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'indimjc1@gmail.com',
      password: process.env.PW
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './data/migrations'
    }
  }
};
