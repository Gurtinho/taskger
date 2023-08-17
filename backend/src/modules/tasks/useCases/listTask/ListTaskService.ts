import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/prisma/ITasksRepository';
import { AppError } from '@/src/shared/errors/AppError';

@injectable()
class ListTaskService {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) { }
    
    async execute() {
        try {
            const tasks = await this.tasksRepository.list();
            return tasks;
        } catch (err) {
            throw new AppError('Ocorreu um erro ao listar as tarefas', 400);
        } 
    }
}

export { ListTaskService };