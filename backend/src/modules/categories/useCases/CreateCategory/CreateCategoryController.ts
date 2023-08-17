import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryService } from './CreateCategoryService';
import { AppError } from '@/src/shared/errors/AppError';

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const { title } = req.body;
            const { id: user_id } = req.user;
            const createCategoryService = container.resolve(CreateCategoryService);
            await createCategoryService.execute({ title, user_id });
            return res.status(200).json({ message: 'Categoria criada com sucesso' });
        } catch (err) {
            throw new AppError('Ocorreu um erro ao criar categoria', 500);
        }
    }
}

export { CreateCategoryController };