export interface IAccount {
    id: string;
    user_id : string;
    balance: number;
}

export interface sendMoneyDetails {
    sender_id: string;
    receiver_id: string;
    amount: number;
    currency?: string
}
export interface addMoneyToAccount {
    user_id : string;
    amount: number
}