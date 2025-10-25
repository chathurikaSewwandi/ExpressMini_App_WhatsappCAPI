import { ICreateProduct } from '../dto/product/createProduct.dto';
import { IFilterProduct } from '../dto/product/filterProduct.dto';
import { IUpdateProduct } from '../dto/product/updateProduct.dto';
import { IProduct } from '../model/product.model';
import { ProductDao } from './../dao/product.dao';


export class ProductService {
    private static instance: ProductService;
    private productDao: ProductDao;

    public static getInstance(): ProductService{
        if(!ProductService.instance){
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
        }
        
        private constructor() {
            this.productDao = ProductDao.getInstance();
        }
        public async createProduct(product:ICreateProduct):Promise<IProduct>{
        try {
            return await this.productDao.createProduct(product);
        } catch (error) {
            console.log(error);
            throw error;
        }
        }
        public async updateProduct(id:string, product:IUpdateProduct):Promise<IProduct>{
            try {
                return await this.productDao.updateProduct(id,product);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        public async deleteProduct(id: string): Promise<IProduct>{
            try {
                return await this.productDao.deleteProduct(id);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        public async getProductById(id:string): Promise<IProduct>{
           try {
            return await this.productDao.getProductById(id);
           } catch (error) {
            console.log(error);
            throw error;
           }
    }
    public async getProducts(filter:IFilterProduct):Promise<IProduct[]>{
        try {
            return await this.productDao.getProducts(filter);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
