import { Manager } from "./Manager";

export interface Shop {
    id:          number;
    name:        string;
    type:        number;
    managerIds:  number[];
    miniShopIds: number[];
    ownerId:     null;
    ownerEmail:  null;
    createdAt:   number;
    updatedAt:   number;
}

export interface shopObject {
    shop : Shop,
    Managers : Manager
}

export interface MiniShop {
    id:          number;
    name:        string;
    type:        number;
    managerIds:  any[];
    miniShopIds: any[];
    ownerId:     null;
    ownerEmail:  null;
    createdAt:   number;
    updatedAt:   number;
}   
export interface Sales {
    shopId:                 number;
    shopName:               string;
    date:                   Date;
    totalSales:             number;
    imageUrl:               string;
    ownerConsentStatus:     number;
    miniOwnerConsentStatus: number;
    status:                 number;
}