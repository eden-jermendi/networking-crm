import knex, { type Knex } from "knex";
import knexConfig from "../../knexfile.js";

const environment = "development";

export function createDatabase(config: Knex.Config): Knex {
  return knex(config);
}

export const db = createDatabase(knexConfig[environment]);
