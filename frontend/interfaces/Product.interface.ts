import { Category } from "./Category.interface";
import { Entity } from "./Entity.interface";
import { Tag } from "./Tag.interface";

export interface Product extends Entity {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    available: boolean;
    images: string[];
    categories: Category[];
    tags: Tag[];
}