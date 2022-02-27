import { ITransaction } from "App/DTO/Transaction/TransactionInterface";
import Transaction from "App/Model/Transaction_model";
import { SQLPD_repository } from "expresswebcorets/lib/Repository/SQLPD_repository";

class TransactionRepository  extends SQLPD_repository{
    constructor() {
        super(Transaction)
    }
    async getTransaction(user_id: string) : Promise<ITransaction[]> {
        return new Promise(async(reject, resolve) => {
            try{
                const transaction = await Transaction.query().where('sender_id', user_id).orWhere('receiver_id', user_id)
                                    .orderBy('created_at', 'desc')
                                    .withGraphFetched('sender').withGraphFetched('receiver');
                
                resolve(transaction)
            }catch(error:any) {
                reject(error)
            }
        })
    }
}

export default TransactionRepository