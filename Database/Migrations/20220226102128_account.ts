/**
 * Migration layout file.
 * Assign your table name to the tableName variable.
 * Remember, it's always in plural
 */
import { Migration } from "Elucidate/Database/Model";
import DefinedTableNames from "../../Utils/db_constants";

let tableName = DefinedTableNames.ACCOUNT;
let schema = process.env.SCHEMA_NAME!
exports.up = function (migration:Migration) {
  return migration.schema
  .createTable(tableName, (table) => {
    table.uuid("id");
    table.uuid('user_id').references('id').inTable('');
    table.decimal('balance').defaultTo(0.00)
    table.timestamps(true, true);
  });
};

exports.down = function (migration:Migration) {
  return migration.schema.dropTable(tableName);
};
