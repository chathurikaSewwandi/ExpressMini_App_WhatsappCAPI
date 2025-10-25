import { ProductType } from "../../model/product.model";

export interface IFilterProduct{
     name?: string;
     type?: ProductType;
     price?: number;
     start?: number;
     limit?: number;
}