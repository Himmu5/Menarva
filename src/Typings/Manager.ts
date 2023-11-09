export interface Manager {
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


export interface SingleManager {
    userDO:          UserDO;
    authorities:     Authorities;
    shopAuthorities: ShopAuthorities;
}

// export interface Authorities {
//     CONFIG: Config;
// }

export interface Config {
    READ: boolean;
}

export interface ShopAuthorities {
    "3": The3;
}

export interface The3 {
    ACCOUNTING: Accounting;
    SHOP:       Accounting;
    MANAGER:    Accounting;
    SOP:        Config;
}

export interface Accounting {
    READ:          boolean;
    WRITE:         boolean;
    UPDATE:        boolean;
    DELETE:        boolean;
    IMAGE_UPLOAD?: boolean;
}

export interface UserDO {
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
export interface Role {
    id:          string;
    tenantId:    string;
    name:        string;
    role:        string;
    authorities: Authorities;
}

export interface Authorities {
    EMPLOYEE:              Employee;
    SOP:                   Employee;
    SHOP:                  Employee;
    MINI_SHOPS_ACCOUNTING: MiniShopsAccounting;
}

export interface Employee {
    UPDATE:        boolean;
    WRITE:         boolean;
    READ:          boolean;
    UPLOAD_PHOTO?: boolean;
}

export interface MiniShopsAccounting {
    READ:         boolean;
    MODIFY:       boolean;
    RESTOCK:      boolean;
    UPDATE:       boolean;
    IMAGE_UPLOAD: boolean;
    WRITE:        boolean;
}
