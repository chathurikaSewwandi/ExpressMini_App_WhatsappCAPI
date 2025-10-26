import { authenticateJWT, requiredRole } from '../middleware/auth.middleware';
import { UserType } from '../model/user.model';
import { ProductController } from './../controller/product.controller';
import { Router } from "express";

export class ProductRouter {
    private router: Router;
    private static instance: ProductRouter;
    private productController: ProductController;
    public static getInstance() : ProductRouter {
        if(!ProductRouter.instance){
            ProductRouter.instance = new ProductRouter();
        }
        return ProductRouter.instance;
    }
    private constructor(){
        this.router = Router();
        this.productController = new ProductController();
        this.initRoutes();
    }
    private initRoutes(){
        this.router.post(
         "/",
        authenticateJWT(),
        requiredRole(UserType.ADMIN),
        this.productController.createProduct
        );
        this.router.patch(
        "/:id", 
        authenticateJWT(),
        requiredRole(UserType.ADMIN),
        this.productController.updateProduct
        );
        this.router.delete(
        "/:id", 
        authenticateJWT(),
        requiredRole(UserType.ADMIN),
        this.productController.deleteProduct
        );
        this.router.get("/:id", this.productController.getProductById);
        this.router.get("/",this.productController.getProducts);
    }
    public getRouter(): Router{
        return this.router;
 }
}