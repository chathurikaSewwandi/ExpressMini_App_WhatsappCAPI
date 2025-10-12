import { ERRORS } from "../constants/errors.constants";
import { LoginDto } from "../dto/login/login.dto";
import { IUser } from "../model/user.model";
import { AuthService } from "../service/auth.service";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class AuthController {
    private authService: AuthService;
    private userService: UserService;
    constructor(){
        this.authService = AuthService.getInstance();
        this.userService = UserService.getInstance();
    }
    //register
        register = async (req:Request, res:Response) =>{
            const user = req.body as unknown as IUser;
            if(!user.name || !user.phoneNumber){
                res.status(400).json({message: 'Name and phone number are required'});
                return;
            }
            try{
                const createdUser = await this.userService.createUser(user);
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
    login = async(req: Request, res:Response) => {
        const user = req.body as unknown as LoginDto; //{email:string, password: string}
        try {
            const loginUser = await this.authService.login(user);
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
}