
import mongoose from 'mongoose';
import { IProduct, Product } from './../model/product.model';
import { IFilterProduct } from '../dto/product/filterProduct.dto';
import { ICreateProduct } from '../dto/product/createProduct.dto';
export class ProductDao{
    private static instance: ProductDao;
    public static getInstance():ProductDao {
        if(!ProductDao.instance){
            ProductDao.instance = new ProductDao();
        }
        return ProductDao.instance;
    }
    private constructor(){

    }
    public async createProduct(product:ICreateProduct): Promise<IProduct>{
       try {
        const newProduct = new Product(Product);
        return await newProduct.save() as IProduct;
       } catch (error) {
        console.log(error);
        throw error;
       } 
    }
    public async updateProduct(id:string, product:Partial<IProduct>): Promise<IProduct>{
        try {
            return await Product.findByIdAndUpdate(id,product,{new:true}).lean().exec() as IProduct;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    public async deleteProduct(id: string): Promise<IProduct>{
        try {
            return await Product.findByIdAndDelete(id).lean().exec() as IProduct;
        } catch (error) {
             console.log(error);
             throw error;
        }
    }
    public async getProductById (id:string): Promise<IProduct> {
       try{
        return await Product.findById(new mongoose.Types.ObjectId(id)).lean().exec() as IProduct;

        }catch(error){
            console.log(error);
            throw error;
        }
       }
       public async getProducts(filter:IFilterProduct): Promise<IProduct[]>{
        try {
            const {name,type,price,start = 0 , limit = 10 } = filter;
            const query: any = {};
            if(name){
                query.name = name;
            } 
            if(type){
                query.type = type;
            }
            if(price){
                query.price = price;
            }
            return await Product.find(query).skip(start).limit(limit).lean().exec() as IProduct[];
        } catch (error) {
            console.log(error);
            throw error;
        }
       }
}