import { ITransaction } from "App/DTO/Transaction/TransactionInterface";
import TransactionRepository from "App/Repository/TransactionRepository";
import ITransactionService from "./ITransactionService";

class TransactionService implements ITransactionService {
    getAll(): Promise<ITransaction[]> {
        return new Promise(async (reject, resolve) => {
            try{
                const getAllTransaction = await new TransactionRepository().getAll();
                resolve(getAllTransaction)
            }catch(error:any) {
                reject(error)
            }
        })
    }

    async getAllByUserId(user_id: string) :Promise<ITransaction[]> {
        return new Promise(async(reject, resolve) => {
            try{
                
                const transactions = await new TransactionRepository().getTransaction(user_id);
                console.log(transactions);
                
                resolve(transactions)
            }catch(error:any) {
                reject(error)
            }
        })
    }

    saveTransaction(transactionDetails: ITransaction): Promise<ITransaction> {
        return new Promise(async (reject, resolve) => {
            try{
                const saveTransaction = await new TransactionRepository().create(transactionDetails)
            }catch(error:any) {
                reject(error)
            }
        })
    }

}

export default TransactionService