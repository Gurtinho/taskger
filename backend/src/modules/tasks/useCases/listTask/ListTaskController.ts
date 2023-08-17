import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@/src/shared/errors/AppError';
import { ListTaskService } from './ListTaskService';

class ListTaskController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const listTaskService = container.resolve(ListTaskService);
            const tasks = await listTaskService.execute();
            return res.status(200).json(tasks);
        } catch (err) {
            throw new AppError('Ocorreu um erro ao listar as tarefas', 400);
        }
    }
}

export { ListTaskController };