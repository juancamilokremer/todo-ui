export interface Task {
    id: number;
    name: string;
    items: Item[];
}

export interface Item {
    id: number;
    name: string;
    finish: boolean;
}

export interface TaskPayload {
    name: string;
}