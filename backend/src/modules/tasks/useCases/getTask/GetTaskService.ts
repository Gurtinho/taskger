import { inject, injectable } from 'tsyringe';
import { ICreateTasksResponse } from '../../dtos/ITaskDTO';
import { ITasksRepository } from '../../repositories/prisma/ITasksRepository';
import { AppError } from '@/src/shared/errors/AppError';

@injectable()
class GetTaskService {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) { }
    
    async execute(id: string): Promise<ICreateTasksResponse | null> {
        try {
            const task = await this.tasksRepository.get(id);
            return task;
        } catch (err) {
            throw new AppError('Ocorreu um erro ao buscar a tarefa', 500);
        }
    }
}

export { GetTaskService };