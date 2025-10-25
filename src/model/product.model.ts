import mongoose from "mongoose";

export enum ProductType{
    COFFEE = 'coffee',
    TEA = 'tea',
    FOOD = 'food',
    OTHER = 'other'
}
export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    type: ProductType;
    createdAt?: Date;
    updatedAt?: Date;
}
export const  ProductSchema = new mongoose.Schema(
{
    name: {type:String,required:true},
    description:{ type: String,required:true},
    price:{type:Number,required:true},
    type:{type:String,name:Object.values(ProductType),required:true},

},
{
    timestamps: true
}
);
export const Product = mongoose.model<IProduct>('Product', ProductSchema);