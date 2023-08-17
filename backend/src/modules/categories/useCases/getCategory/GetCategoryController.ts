import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetCategoryService } from './GetCategoryService';
import { AppError } from '@/src/shared/errors/AppError';

class GetCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const getCategoryService = container.resolve(GetCategoryService);
            const category = await getCategoryService.execute(id);
            return res.status(200).json(category);
        } catch (err) {
            throw new AppError('Ocorreu um erro ao buscar a categoria', 500);
        }
    }
}

export { GetCategoryController };