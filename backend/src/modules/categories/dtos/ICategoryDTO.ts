export interface ICreateDTO {
    title: string;
    user_id: string;
}

export interface IResponseDTO {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
}

export interface IGetCategoryDTO {
    id: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    task: {
        id: string;
        title: string;
        content: string;
        message: string | null;
        progress: number;
        concluded: boolean;
        category_id: string;
        created_at: Date;
        updated_at: Date;
    }[]
}