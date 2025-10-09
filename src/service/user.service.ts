import { User } from './../model/user.model';

import { IUser } from '../model/user.model';
import { UserDao } from './../dao/user.dao';
import { ERRORS } from '../constants/errors.constants';
import { LoginDto } from '../dto/login/login.dto';
export class UserService{
    private userDao:UserDao;
    private static instance:UserService;
    public static getInstance():UserService{
        if(!UserService.instance){
            UserService.instance = new UserService();
    }
    return UserService.instance;
}
private constructor(){
    this.userDao = UserDao.getInstance();
}

public async createUser(user:IUser): Promise<IUser>{
    try{
        const createdUser = await this.userDao.createUser(user); 
        return createdUser;
    }catch(error:any){
       
        if(error.code === 11000){
              console.log(error.errorResponse.errmsg);
            throw new Error(ERRORS.USER_ALREADY_EXISTS);
        }
        console.log(error);
        throw error;
    }
}
public async login(user:LoginDto):Promise<Partial<IUser>>{
    try {
        const loginUser = await this.userDao.getUserByEmail(user.email);
        //check if user exist
        if(!loginUser){
            throw new Error(ERRORS.USER_NOT_FOUND);
        }
        //check if password is correct
        if(loginUser.password !== user.password){
            throw new Error(ERRORS.INVALID_PASSWORD);
        }
        //destructuring the password
        const {password,createdAt,updatedAt, ...userWithoutPassword} = loginUser;

        return userWithoutPassword;
        
    } catch (error:any) {
         console.log(error.message);
        throw error;
    }
}
}