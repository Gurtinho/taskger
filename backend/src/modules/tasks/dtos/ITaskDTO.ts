export interface ICreateTasksProps {
    title: string;
    content: string;
    progress?: number;
    concluded?: boolean;
    user_id: string;
    category_id: string;
}

export interface ICreateTasksResponse {
    title: string;
    content: string;
    progress?: number;
    concluded?: boolean;
}

export interface IListTasksResponse {
    id: string;
    title: string;
    content: string;
    progress?: number;
    concluded?: boolean;
    created_at: Date;
}

export interface IGetTasksResponse {
    id: string;
    title: string;
    content: string;
    message: string | null;
    progress?: number;
    concluded?: boolean;
    category_id: string,
    created_at: Date;
    updated_at: Date;
}