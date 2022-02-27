"use strict";
import { ITransaction } from "App/DTO/Transaction/TransactionInterface";
import {Model} from "Elucidate/Database/Model";
import DefinedTableNames from "Utils/db_constants";
    class Transaction extends Model implements ITransaction{
      sender_id!: string;
      receiver_id!: string;
      currency!: string;
      amount!: number;
      id!: number
      // Table name
      static tableName = DefinedTableNames.TRANSACTIONS

      static relationMappings() {
        return {
          sender: this.belongsTo('App/Model/User_model',{foreign_key: 'sender_id', filter: (filter => {
            filter.select('first_name', 'last_name')
          })}),
          receiver: this.belongsTo('App/Model/User_model',{foreign_key: 'receiver_id', filter: (filter => {
            filter.select('first_name', 'last_name')
          })})
        }
      }
      
    }

    export default Transaction;