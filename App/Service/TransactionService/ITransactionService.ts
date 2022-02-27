import { ITransaction } from "App/DTO/Transaction/TransactionInterface";

interface ITransactionService {
getAll(): Promise<ITransaction[]>
getAllByUserId(user_id: string) :Promise<ITransaction[]>
saveTransaction(transactionDetails: ITransaction): Promise<ITransaction>
}
export default ITransactionService