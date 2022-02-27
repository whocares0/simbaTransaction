import User from "App/Model/User_model"
import {SQLPD_repository} from "Elucidate/Repository/SQLPD_repository";

class UserRepository extends SQLPD_repository {
    constructor() {
        super(User)
    }
 }

 export default UserRepository