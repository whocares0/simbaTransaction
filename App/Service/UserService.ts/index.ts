import { ICreateUser, ISignInDetails, IUser } from "App/DTO/User/UserInterface"
import UserRepository from "App/Repository/UserRepository"
import bcrypt from "bcryptjs"
import IUserService from "./IUserService"
import jwt from 'jsonwebtoken'
import ICreateAccountService from "../AccountService/ICreateAccountService"

class UserService implements IUserService {
    private accountService: ICreateAccountService
    constructor(AccountService:ICreateAccountService) {
        this.accountService = AccountService
    }
    create(createData: ICreateUser): Promise<IUser | any> {
        return new Promise (async (reject, resolve) => {
            try {
                const checkUser = await new UserRepository().findOne({email: createData.email})
                
                if(checkUser) {
                    reject(`Email ${createData.email} already exist`)
                }

                const hashedPassword = await bcrypt.hash(createData.password, 10);
                if(!hashedPassword) {
                    reject('Account could not be created, please try again')
                }
                const dataToDb = {
                    ...createData,
                    password: hashedPassword
                }
                const result = <IUser>await new UserRepository().create(dataToDb)
                if(!result) {
                    reject('Error Occured')
                }

                await this.accountService.createAccount(result.id)
                const userData = {
                    id: result.id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    email: result.email
                }
                
                const token = await jwt.sign(userData, 'jwt_secret')
                const data = {
                    result,
                    token
                }
                resolve(data)
            }catch(error: any) {
                reject(error)
            }
        })
    }

    update(id: string, updateData: any): Promise<object |string> {
        return new Promise (async (reject, resolve) => {
            try {
                const user = await new UserRepository().findById(id)
                if(!user) {
                    reject('No User found')
                }
                const updatedData = await new UserRepository().updateOne(id,updateData)
                resolve(updatedData)
            }catch(error: any) {
                reject(error)
            }
        })
    }

    signIn(signInDetails: ISignInDetails): Promise<IUser | any> {
        return new Promise (async (reject, resolve) => {
            try {
                const user:any =  await new UserRepository().findOne({email:signInDetails.email})

                if(!user) {
                    reject(`Email ${signInDetails.email} not found`)
                }
                const isPassword = await bcrypt.compare(signInDetails.password,user.password)
                if(!isPassword) {
                    reject(`Incorrect Email or Password`)
                }

                
                const userData = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
                const token = await jwt.sign(userData, 'jwt_secret')
                delete user.password
                const data = {
                    user,
                    token
                }
                resolve(data)
            }catch(error: any) {
                reject(error)
            }
        })
    }

    getAll(): Promise<IUser[] | any> {
        return new Promise (async (reject, resolve) => {
            try {
                const user = await new UserRepository().getAll()
                resolve(user)
            }catch(error: any) {
                reject(error)
            }
        })
    }


}

export default UserService