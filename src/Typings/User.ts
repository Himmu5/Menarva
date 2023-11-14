
export interface UserClass {
    entities: Entity[]
    isActive:  boolean;
    id:        number;
    name:      string;
    email:     string;
    username:  string;
    password:  string;
    role:      number;
    createdAt: number;
    updatedAt: number;
}

export interface Entity {
    isActive: boolean;
    tenantId: string;
    id:       string;
    name:     string;
    type:     number;
}

export type UserConfig =  {
    ACCOUNTING: Accounting;
    SHOP:       Accounting;
    MANAGER:    Accounting;
    CONFIG:     Accounting;
    SOP : {
        READ : boolean;
        IMAGE_UPLOAD:boolean
    }
}

export interface Accounting {
    READ:          boolean;
    WRITE:         boolean;
    UPDATE:        boolean;
    DELETE:        boolean;
    IMAGE_UPLOAD?: boolean;
}
