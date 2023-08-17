import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { ICreateDTO } from '../../dtos/ICategoryDTO';
import { AppError } from '@/src/shared/errors/AppError';

@injectable()
class CreateCategoryService {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) { }
    
    async execute({ title, user_id }: ICreateDTO) {
        try {
            if (title == '' || user_id == '') {
                throw new AppError('Os campos não foram preenchidos', 400);
            }
            const category = await this.categoryRepository.create({ title, user_id });
            return category;
        } catch (err) {
            throw new AppError('Ocorreu um erro ao criar a categoria', 500);
        }
    }
}

export { CreateCategoryService };