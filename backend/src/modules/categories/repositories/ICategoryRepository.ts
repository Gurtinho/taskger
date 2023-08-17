import { ICreateDTO, IGetCategoryDTO, IResponseDTO } from '../dtos/ICategoryDTO';

export interface ICategoryRepository {
    create({ title, user_id }: ICreateDTO): Promise<void>;

    list(): Promise<IResponseDTO[]>;

    get(id: string): Promise<IGetCategoryDTO>;
}