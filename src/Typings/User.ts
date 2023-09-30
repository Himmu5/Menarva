export interface User {
    accessToken: string;
    username:    null;
    password:    null;
    user:        UserClass;
}

export interface UserClass {
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


export type UserConfig =  {
    ACCOUNTING: Accounting;
    SHOP:       Accounting;
    MANAGER:    Accounting;
    CONFIG:     Accounting;
}

export interface Accounting {
    READ:          boolean;
    WRITE:         boolean;
    UPDATE:        boolean;
    DELETE:        boolean;
    IMAGE_UPLOAD?: boolean;
}
