import { AuthController } from './../controller/auth.controller';
import { Router } from "express";

export class AuthRouter {
    private router: Router;
    private static instance: AuthRouter;
    private authController: AuthController;
    public static getInstance() : AuthRouter{
        if(!AuthRouter.instance){
            AuthRouter.instance = new AuthRouter();
        }
        return AuthRouter.instance;
    }
    private constructor(){
        this.router= Router();
        this.authController= new AuthController();
        this.initRoutes();
    }
    public initRoutes(){
        this.router.post("/login", this.authController.login);
        this.router.post("register", this.authController.register);
    }
    public getRouter(): Router{
        return this.router;
    }
}