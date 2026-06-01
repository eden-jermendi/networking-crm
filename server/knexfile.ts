import type { Knex } from "knex";

const config: Record<string, Knex.Config> = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/networking-crm.sqlite3"
    },
    migrations: {
      directory: "./migrations",
      extension: "ts"
    },
    seeds: {
      directory: "./seeds",
      extension: "ts"
    },
    useNullAsDefault: true
  }
};

export default config;
