import { Entity } from "./Entity.interface";
import { Subcategory } from "./Subcategory.interface";

export interface Category extends Entity {
    name: string;
    subcategories: Subcategory[];
}