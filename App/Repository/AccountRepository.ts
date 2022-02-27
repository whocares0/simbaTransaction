import Account from "App/Model/Account_model"
import { SQLPD_repository } from "expresswebcorets/lib/Repository/SQLPD_repository"
import { sendMoneyDetails } from "App/DTO/Account/AccountInterface"

class AccountRepository extends SQLPD_repository{
constructor() {
    super(Account)
}
async sendMoney(sendMoneyDetails: sendMoneyDetails) {
    return await new Promise(async (reject, resolve) => {
        try{
            const moneyTransaction = await Account.transaction(async (trx) => {
                try{     
                const senderAccount = await Account.query(trx).where('user_id',sendMoneyDetails.sender_id).first()    
                const receiverAccount = await Account.query(trx).where('user_id',sendMoneyDetails.receiver_id).first()
                if(!senderAccount || !receiverAccount) {
                    reject('Invalid Account')
                }
                const tempSenderBalance = Number(senderAccount.balance) - sendMoneyDetails.amount
                if(tempSenderBalance < 0) {
                    reject('Insufficient money, please fund your account')
                }
                const senderNewAccount = await Account.query(trx).where('user_id',sendMoneyDetails.sender_id).patch({balance: tempSenderBalance}).returning('*');
               
                const tempReceiverBalance = Number(receiverAccount.balance) + sendMoneyDetails.amount
                const receiverNewAccount = await Account.query(trx).where('user_id',sendMoneyDetails.receiver_id).patch({balance: tempReceiverBalance});
                trx.commit();
                resolve(senderNewAccount)
                }catch(error) {
                    trx.rollback()
                    reject(error)
                }              
            })
            resolve(moneyTransaction)
        }catch(error) {   
            reject(error)
        }
    })
}

async updateAccount(user_id: string, newBalance: number) {
    return await new Promise(async (reject, resolve) => {
        try{
           const updateBalance = await Account.query().where('user_id', user_id).update({balance: newBalance}).returning('*');
           resolve(updateBalance)
        }catch(error) {   
            reject(error)
        }
    })
}
}
export default AccountRepository