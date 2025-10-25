import { ProductType } from '../../model/product.model';

export interface IUpdateProduct{
    name?: string;
    description?: string;
    price?: number;
    type?: ProductType;
}