import { Product, ProductType } from './../model/product.model';
import { constants } from 'fs';
import { ICreateProduct } from '../dto/product/createProduct.dto';
import { IUpdateProduct } from '../dto/product/updateProduct.dto';
import { ProductService } from './../service/product.service';
import { Request,Response } from 'express';
import { Message } from '../model/message.model';

export class ProductController{
    
    private ProductService: ProductService;
    constructor(){
        this.ProductService = ProductService.getInstance();
    }
    createProduct = async(req:Request, res:Response)=> {
        const Product = req.body as ICreateProduct;
        if(!Product.name || !Product.description || !Product.price || !Product.type){
            res.status(400).json({Message: 'Name,description,price and type are required'});
            return;
        }
        try {
            const createProduct = await this.ProductService.createProduct(Product);
            res.status(400).json(createProduct);
        } catch (error) {
            res.status(500).json({Message: 'Internam sserver error'});
        }
    }
    updateProduct = async (req:Request,res:Response) => {
        const product = req.body as IUpdateProduct;
        try {
            const updatedProduct = await this.ProductService.updateProduct(req.params.id,product);
            res.status(200).json(updatedProduct)
        } catch (error:any) {
            res.status(500).json({Message: 'Internal server error'});
        }
    }
    deleteProduct = async (req: Request, res:Response) => {
        try {
            const deletedProduct = await this.ProductService.deleteProduct(req.params.id);
            res.status(200).json(deletedProduct)
        } catch (error:any) {
            res.status(500).json({Message: 'Internal server error'});
        }
    }
    getProductById = async (req: Request, res: Response) => {
        try {
            const Product = await this.ProductService.getProductById(req.params.id);
            res.status(200).json(Product);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }
    getProducts = async (req: Request, res: Response) => {
        try {
            const name = req.query.name as string;
            const type = req.query.type as ProductType;
            const price = parseFloat(req.query.price as string);
            const start = parseInt(req?.query.start as string) || 0;
            const limit = parseInt(req?.query.limit as string) || 10;
            const Products = await this.ProductService.getProducts({name,type,price,start,limit});
            res.status(200).json(Products);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }
}