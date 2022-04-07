// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        database: 'lendsqr_dev',
        user:     'root',
        password: ''
      },
      useNullAsDefault: true,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      seeds: {
        directory: './seeds',
      },
    },
  
    test: {
      client: 'mysql2',
      connection: {
        database: 'lendsqr_test',
        user:     'root',
        password: ''
      },
      useNullAsDefault: true,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      seeds: {
        directory: './seeds',
      },
    },
  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'lendsqr_staging',
        user:     'username',
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
      client: 'mysql2',
      connection: {
        database: 'lendsqr_prod',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  
  };
  