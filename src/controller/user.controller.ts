import { AuthService } from './../service/auth.service';
import { Request, Response } from "express";
import { UserService } from './../service/user.service';
import { ERRORS } from '../constants/errors.constants';
import { AuthRequest } from '../middleware/auth.middleware';
export class UserController{
    private userService:UserService;
    private authService: AuthService;
    constructor(){
        this.userService = UserService.getInstance();
        this.authService = AuthService.getInstance(); 
    }
//register
  
    hello = async (req: Request, res: Response) => {
        res.status(200).json({message: 'Hello'});
    }
    getCurrentUser = async (req: AuthRequest, res: Response)=> {
       try {
        console.log(req.user);
        res.status(200).json(req.user);
       
       } catch (error:any) {
        if(error.message === ERRORS.INVALID_TOKEN){
            res.status(401).json({message: 'Invalid token'});
            return;
        }else{
            res.status(500).json({message: 'Internal server error'});
            return;
        }
       }
        
    }
    updateUser = async (req: AuthRequest, res: Response) => {
        const user = req.user;
        const { name, phoneNumber } = req.body;
        if(!user || !(name || phoneNumber)){
            res.status(400).json({message: 'Name and phone number are required'});
            return;
        }
        try{
            const updatedUser = await this.userService.updateUser(user._id as string, { name, phoneNumber });
            res.status(200).json(updatedUser);
        }catch(error:any){
            if(error.message === ERRORS.USER_NOT_FOUND){
                res.status(404).json({message: 'User not found'});
                return;
            }
        }
    }

}