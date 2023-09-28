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
