import { addMoneyToAccount, sendMoneyDetails } from '../../DTO/Account/AccountInterface'

interface IAccountService {
sendMoney(sendMoneyDetails: sendMoneyDetails): Promise<object |any>
addMoney(addMoney : addMoneyToAccount): Promise<object| any>
createAccount(user_id : string): Promise<object | any>
getAccountDetails(user_id: string): Promise<object | any>
}
export default IAccountService