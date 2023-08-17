import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTaskService } from './CreateTaskService';
import { AppError } from '@/src/shared/errors/AppError';

class CreateTaskController {
    async handle(req: Request, res: Response) {
        try {
            const { title, content, progress, concluded, category_id } = req.body;
            const { id } = req.user;
            const createTaskService = container.resolve(CreateTaskService);
            const task = await createTaskService.execute({
                title, content, concluded, progress, user_id: id, category_id
            });
            return res.status(200).json(task);
        } catch (err) {
            throw new AppError('Ocorreu um erro ao criar tarefa', 500);
        }
    }
}

export { CreateTaskController };