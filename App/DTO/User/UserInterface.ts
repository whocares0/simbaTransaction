export interface ICreateUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string
}

export interface ISignInDetails {
    email:string;
    password: string
}

export interface IUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    created_at: string;
    updated_at : string
}