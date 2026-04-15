import { Entity } from "./Entity.interface";

export interface Tag extends Entity {
    name: string;
    color: string;
    available: boolean;
}