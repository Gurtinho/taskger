import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { AppError } from '@/src/shared/errors/AppError';

@injectable()
class ListCategoryService {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) { }
    
    async execute() {
        try {
            const categories = this.categoryRepository.list();
            return categories;
        } catch (err) {
            throw new AppError('Ocorreu um erro ao listar as categorias', 500);
        }
    }
}

export { ListCategoryService };