// Initialize knex.
import Knex from "knex";
import { knexSnakeCaseMappers } from "objection";

export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "aws_social",
  },
  migrations: {
    tableName: "migrations",
    directory: "./db/migrations",
    extension: "ts",
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
