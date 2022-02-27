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
   .alterTable(tableName, (table) => {
     table.decimal('balance').defaultTo(0.00).alter()
   });
 };
 
 exports.down = function (migration:Migration) {
   return migration.schema.alterTable(tableName, (table) => {
    table.decimal('balance').defaultTo('0.00')
  });
 };
 