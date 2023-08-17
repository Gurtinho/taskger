import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoryService } from './ListCategoryService';
import { AppError } from '@/src/shared/errors/AppError';

class ListCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const listCategoryService = container.resolve(ListCategoryService);
            const categories = await listCategoryService.execute();
            return res.status(200).json(categories);
        } catch (err) {
            throw new AppError('Ocorreu um erro ao listar as categorias', 500);
        }
    }
}

export { ListCategoryController };