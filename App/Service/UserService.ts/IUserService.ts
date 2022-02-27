import { ICreateUser, ISignInDetails, IUser } from "App/DTO/User/UserInterface";

interface IUserService {
    create(createData:ICreateUser): Promise<IUser | any>
    update(id:string, updateData:any): Promise<object | string>
    signIn(signInDetails: ISignInDetails) :Promise<IUser>
    getAll() :Promise<IUser[]>

}

export default IUserService