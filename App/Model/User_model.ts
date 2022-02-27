"use strict";
import { IUser } from "App/DTO/User/UserInterface";
    import {Model} from "Elucidate/Database/Model";
import DefinedTableNames from "Utils/db_constants";
import { v4 as uuidv4 } from 'uuid'

    class User extends Model implements IUser{
      id!: string;
      email!: string;
      first_name!: string;
      last_name!: string;
      password!: string;
      created_at!: string;
      updated_at!: string;
      // Table name
      static tableName = DefinedTableNames.USERS

      $beforeInsert(context: any) {
        this.id = uuidv4()
      }
      
    }

    export default User;