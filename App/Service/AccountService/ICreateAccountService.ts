interface ICreateAccountService {
    createAccount(user_id : string): Promise<object | any>
}
export default ICreateAccountService