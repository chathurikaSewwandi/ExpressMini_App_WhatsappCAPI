import { APP_CONFIG } from "../config/app.config";
import { ERRORS } from "../constants/errors.constants";
import { UserDao } from "../dao/user.dao";
import { LoginDto, LoginResponseDto } from "../dto/login/login.dto";
import jwt from "jsonwebtoken";
import { IUser, UserType } from "../model/user.model";

export class AuthService {
    private static instance: AuthService;
    private userDao:UserDao ;
    public static getInstance(): AuthService {
        if(!AuthService.instance){
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    private constructor(){
        this.userDao = UserDao.getInstance();
    }
    public async login(user:LoginDto): Promise<LoginResponseDto>{
        try {
            const loginUser = await this.userDao.getUserByEmail(user.email);
            if(!loginUser){
                throw new Error(ERRORS.USER_NOT_FOUND);
            }
            if (loginUser.password !== user.password) {
                throw new Error(ERRORS.INVALID_PASSWORD);
                
            }
          
            return  await this.generateTokens(loginUser);

        } catch (error:any) {
            throw error;
            
        }
    }
    public async generateTokens(user: IUser): Promise<LoginResponseDto>{
       
            //generate token
            const accessToken = jwt.sign(
                {id: user._id, type:user.type},
                APP_CONFIG.ACCESS_TOKEN_SECRET as string,
                {expiresIn: '1h'}
            );
            const refreshToken = jwt.sign(
                {id:user._id, type: user.type},
                APP_CONFIG.REFRESH_TOKEN_SECRET as string,
                {expiresIn: '7d'}
            );
        
         return {accessToken, refreshToken};
        }
        public verifyToken(token: string): {id:string, type:UserType}{
            // token =  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTdhOGY1NDIwZTE2YTk1NmFiOWE4MiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc2MDQxNjc4OSwiZXhwIjoxNzYwNDIwMzg5fQ.P7AlmxoZWmajraiAXpCuquuxbOyEWNIzys6d54MM-OY
           try{
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, APP_CONFIG.ACCESS_TOKEN_SECRET as string) ;
            return decoded as {id:string, type:UserType};

           }
              catch(error){
                throw new Error(ERRORS.INVALID_TOKEN);
              }
            }
            
        
}