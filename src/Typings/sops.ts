export interface Sops {
    id:    string;
    name:  string;
    tasks: Task[];
}

export interface Task {
    id:            string;
    name:          string;
    imgUrl:        null;
    status:        number;
    photoRequired: boolean;
}
