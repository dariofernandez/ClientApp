// 146.   import uuid from 'uuid/dist/v4';
//        npm install @types/uuid

import {v4 as uuidv4} from 'uuid';

export interface IBasket {
    id: string;
    items: IBasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice?: number;
}

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Basket implements IBasket {
    // id = uuid();
    id = uuidv4();
    items: IBasketItem[] = [];  // initialize so we don't get an error
}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
