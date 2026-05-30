const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env"), override: true });

module.exports = {

  development: {

    client: "pg",

    connection: {

      host: process.env.DB_HOST,

      port: process.env.DB_PORT,

      user: process.env.DB_USER,

      password: process.env.DB_PASSWORD || process.env.DB_PASS,

      database: process.env.DB_NAME,

    },

    migrations: {

      directory: "./migrations",

    },

    seeds: {

      directory: "./seeds",

    },

  },

};
 
