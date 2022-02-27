export interface ITransaction {
    id?: number;
    sender_id: string;
    receiver_id: string;
    currency?: string;
    amount: number;
}