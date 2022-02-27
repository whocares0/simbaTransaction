/**
 * Migration layout file.
 * Assign your table name to the tableName variable.
 * Remember, it's always in plural
 */
import { Migration } from "Elucidate/Database/Model";
import DefinedTableNames from "../../Utils/db_constants";

let tableName = DefinedTableNames.USERS;
let schema = process.env.SCHEMA_NAME!

exports.up = function (migration: Migration) {
  return migration.schema
  .createTable(tableName, (table) => {
    table.uuid("id");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (migration: Migration) {
  return migration.schema.dropTable(tableName);
};
