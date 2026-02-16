require("dotenv").config();
module.exports = {
  development: {
    host: "localhost",
    port: 5432,
    database: "db_courses_hlg",
    username: "postgres",
    password: "postgres",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
