import { CartItem } from "./CartItem.interface";

export interface Cart {
    [_id: string]: CartItem;
}