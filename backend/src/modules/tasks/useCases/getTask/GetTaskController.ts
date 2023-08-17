import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetTaskService } from './GetTaskService';
import { AppError } from '@/src/shared/errors/AppError';

class GetTaskController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const getTaskService = container.resolve(GetTaskService);
            const task = await getTaskService.execute(id);
            return res.status(200).json(task);
        } catch (err) {
            throw new AppError('Ocorreu um erro ao buscar a tarefa', 500);
        }
    }
}

export { GetTaskController };