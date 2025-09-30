import { Request, Response } from "express";
import { IUser } from './../model/user.model';
import { UserService } from './../service/user.service';
export class UserController{
    private UserService:UserService;
    constructor(){
        this.UserService = UserService.getInstance(); 
    }

    createUser = async (req:Request, res:Response) =>{
        const user = req.body as unknown as IUser;
        if(!user.name || !user.phoneNumber){
            res.status(400).json({message: 'Name and phone number are required'});
            return;
        }

        const createdUser = await this.UserService.createUser(user);
        res.status(201).json(createdUser);
    }
    hello = async (req: Request, res: Response) => {
        res.status(200).json({message: 'Hello'});
    }
}