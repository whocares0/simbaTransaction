"use strict";
import { IAccount } from "App/DTO/Account/AccountInterface";
    import {Model} from "Elucidate/Database/Model";
import DefinedTableNames from "Utils/db_constants";
import { v4 as uuidv4 } from 'uuid'
    class Account extends Model implements IAccount{
      user_id!: string;
      balance!: number;
      // Table name
      static tableName =  DefinedTableNames.ACCOUNT
      id!: string;

      $beforeInsert(context: any) {
        this.id = uuidv4()
      }

      static relationMappings() {
        return {
          user : this.belongsTo('App/Model/User_model',{foreign_key: 'user_id'})
        }
      }
      
    }

    export default Account;