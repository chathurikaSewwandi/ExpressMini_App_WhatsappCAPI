import { ProductType } from "../../model/product.model";

export interface ICreateProduct{
    name: string;
    description: string;
    price: number;
    type: ProductType;
}