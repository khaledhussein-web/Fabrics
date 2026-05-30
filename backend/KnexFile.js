<<<<<<< Updated upstream
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env"), override: true });
=======
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: path.resolve(__dirname, ".env"), override: true });
>>>>>>> Stashed changes

module.exports = {

  development: {

    client: "pg",

    connection: {

      host: process.env.DB_HOST,

      port: process.env.DB_PORT,

      user: process.env.DB_USER,

<<<<<<< Updated upstream
      password: process.env.DB_PASSWORD || process.env.DB_PASS,
=======
      password: process.env.DB_PASSWORD ?? process.env.DB_PASS,
>>>>>>> Stashed changes

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
 
