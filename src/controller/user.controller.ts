import { Message } from './../model/message.model';
import { error } from 'console';
import { LoginDto } from './../dto/login/login.dto';
import { Request, Response } from "express";
import { IUser } from './../model/user.model';
import { UserService } from './../service/user.service';
import { ERRORS } from '../constants/errors.constants';
export class UserController{
    private UserService:UserService;
    constructor(){
        this.UserService = UserService.getInstance(); 
    }
//register
    createUser = async (req:Request, res:Response) =>{
        const user = req.body as unknown as IUser;
        if(!user.name || !user.phoneNumber){
            res.status(400).json({message: 'Name and phone number are required'});
            return;
        }
        try{
            const createdUser = await this.UserService.createUser(user);
            res.status(201).json(createdUser);
        }
        catch(error:any){  
            if(error.message === ERRORS.USER_ALREADY_EXISTS){
                res.status(400).json({message: 'User already exists'});
                return;
            }else{
            res.status(500).json({message: 'Internal server error'});
            return;
        }
            
        }
    }
//login
login = async(req: Request, res:Response) => {
    const user = req.body as unknown as LoginDto; //{email:string, password: string}
    try {
        const loginUser = await this.UserService.login(user);
        res.status(200).json(loginUser);
        
    } catch (error:any) {
        if (error.Message === ERRORS.USER_NOT_FOUND) {
            res.status(404).json({message: 'User not found'});
            return;
        }else if(error.message === ERRORS.INVALID_PASSWORD){
            res.status(401).json({message: 'Invalid Password'});
            return;
        }else{
            res.status(500).json({message: 'Internal server error'});
            return;
        }
            
        }
    }

    hello = async (req: Request, res: Response) => {
        res.status(200).json({message: 'Hello'});
    }
}