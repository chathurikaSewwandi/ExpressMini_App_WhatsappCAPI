import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";
import { IUser } from "../model/user.model";

export interface AuthRequest extends Request {
    user?:IUser;
}
export class AuthMiddleware {
    private static instance: AuthMiddleware;
    private authService: AuthService;
    private userService: UserService;
    public static getInstance(): AuthMiddleware {
        if(!AuthMiddleware.instance){
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }
    private constructor(){
        this.authService = AuthService.getInstance();
        this.userService = UserService.getInstance();
    }
    authenticateJWT = async (req: Request, res: Response, next: NextFunction) =>
    {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message: 'Token is required'});
        }
        //to be implemented
        
        const decoded = this.authService.verifyToken(token as string);
        const user =  await this.userService.getUserById(decoded.id);
        (req as AuthRequest).user = user;
        next();
    }

}