import mongoose from 'mongoose';
import { IUser, User } from '../model/user.model';
export class UserDao {
    private static instance: UserDao;
    public static getInstance(): UserDao {
        if(!UserDao.instance){
            UserDao.instance = new UserDao();
        }
        return UserDao.instance;
    }
    private constructor(){
    }

    public async createUser(user:IUser):Promise<Omit<IUser, 'password'>> {
                const newUser = new User(user);
                const createdUser =  await newUser.save();
                // createdUser.phoneNumber = '';
                // createdUser.save();
                const createdUserJson = createdUser.toJSON() as IUser;
                delete (createdUserJson as any).password;
                return createdUser.toJSON()  ;
         }catch(error:any){
            console.log(error);
            throw error;
         }

public async getUserByEmail(email:string): Promise<IUser>{
        try {
            return await User.findOne({email:email}).lean().exec() as IUser;   
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
public async getUserById(id:string, withPassword: 0|1 = 0): Promise<IUser>{
        try {
            return await User.findById(
                new mongoose.Types.ObjectId(id),
               { password:withPassword}
            ).lean().exec() as IUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
public async updateUser(id: string, user: Partial<IUser>): Promise<IUser> {

        try{
            return await User.findByIdAndUpdate(id, user, {new: true}).lean().exec() as IUser;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}
