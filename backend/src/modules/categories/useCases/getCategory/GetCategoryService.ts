import { inject, injectable } from 'tsyringe';
import { IGetCategoryDTO } from '../../dtos/ICategoryDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { AppError } from '@/src/shared/errors/AppError';

@injectable()
class GetCategoryService {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) { }
    
    async execute(id: string): Promise<IGetCategoryDTO | null> {
        try {
            const category = await this.categoryRepository.get(id);
            return category;
        } catch (err) {
            throw new AppError('Ocorreu um erro ao buscar a categoria', 500);
        }
    }
}

export { GetCategoryService };