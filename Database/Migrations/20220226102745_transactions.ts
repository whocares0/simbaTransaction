/**
 * Migration layout file.
 * Assign your table name to the tableName variable.
 * Remember, it's always in plural
 */
import { Migration } from "Elucidate/Database/Model";
import DefinedTableNames from "../../Utils/db_constants";

let tableName = DefinedTableNames.TRANSACTIONS;
let schema = process.env.SCHEMA_NAME!
exports.up = function (migration:Migration) {
  return migration.schema
  .createTable(tableName, (table) => {
    table.increments("id");
    table.uuid('sender_id').references('id').inTable('');
    table.uuid('receiver_id').references('id').inTable('');
    table.string('currency');
    table.decimal('amount');

    table.timestamps(true, true);
  });
};

exports.down = function (migration:Migration) {
  return migration.schema.dropTable(tableName);
};
