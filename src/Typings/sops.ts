export interface Sops {
    status : number;
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

export interface SopCalendar {
    completed:  number[];
    inComplete: number[];
}
