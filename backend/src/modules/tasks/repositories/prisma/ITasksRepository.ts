import { ICreateTasksProps, ICreateTasksResponse, IGetTasksResponse, IListTasksResponse } from '../../dtos/ITaskDTO';

export interface ITasksRepository {
    create({ title, content, progress, concluded, user_id, category_id }: ICreateTasksProps): Promise<ICreateTasksResponse>;

    list(): Promise<IListTasksResponse[]>;

    get(id: string): Promise<IGetTasksResponse | null>;
}