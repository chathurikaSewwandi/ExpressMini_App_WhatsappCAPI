import { IUser } from '../model/user.model';
import { UserDao } from './../dao/user.dao';
import { ERRORS } from '../constants/errors.constants';

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

}