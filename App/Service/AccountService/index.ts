import AccountRepository from "App/Repository/AccountRepository";
import IAccountService from "./IAccountService";
import { addMoneyToAccount, IAccount, sendMoneyDetails } from "App/DTO/Account/AccountInterface";
import ISaveTransactionService from "../TransactionService/ISaveTransactionService";

class AccountService implements IAccountService {
    private transactionService: ISaveTransactionService
constructor(TransactionService: ISaveTransactionService) {
    this.transactionService = TransactionService
}
    
    sendMoney(sendMoneyDetails: sendMoneyDetails): Promise<object | any> {
        return new Promise(async (reject, resolve) => {
            try{
                const sendMoney = <IAccount> await new AccountRepository().sendMoney(sendMoneyDetails);
                console.log({sendMoney});
                
                if(!sendMoney) {
                    reject(`error occured`)
                }
                const saveTransaction = await this.transactionService.saveTransaction(sendMoneyDetails);
                resolve(saveTransaction)
            }catch(error:any) {
                reject(error)
            }
        })
    }

    createAccount(user_id : string): Promise<object | any> {
        return new Promise(async (reject, resolve) => {
            try{
                const checkifUserHaveAccount = <IAccount> await new AccountRepository().findOne({user_id});
                if(checkifUserHaveAccount) {
                    reject('User already have account')
                }
               const createAccount = await new AccountRepository().create({user_id});
               console.log({createAccount});
               
               resolve(createAccount)
            }catch(error:any) {
                reject(error)
            }
        })
    }

    addMoney(addMoney: addMoneyToAccount): Promise<object | any> {
        return new Promise(async (reject, resolve) => {
            try{
               const getAccount = <IAccount> await new AccountRepository().findOne({user_id: addMoney.user_id});
               if(!getAccount) {
                   reject('No Account for this User')
               }
               const newBalance = Number(getAccount.balance) + addMoney.amount;
               console.log({newBalance});
               
               const updatedData = <IAccount>await new AccountRepository().updateAccount(addMoney.user_id, newBalance)
               console.log({updatedData});
               
               resolve(updatedData)
            }catch(error:any) {
                reject(error)
            }
        })
    }

    getAccountDetails(user_id: string): Promise<object | any> {
        return new Promise(async (reject, resolve) => {
            try{
               const getAccount = <IAccount> await new AccountRepository().findOne({user_id});
               
               resolve(getAccount)
            }catch(error:any) {
                reject(error)
            }
        })
    }



}
export default AccountService