import { ITransaction } from "App/DTO/Transaction/TransactionInterface";

interface ISaveTransactionService {
saveTransaction(transactionDetails: ITransaction): Promise<ITransaction>
}
export default ISaveTransactionService