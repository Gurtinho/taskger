import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../../repositories/prisma/ITasksRepository';
import { ICreateTasksProps } from '../../dtos/ITaskDTO';
import { AppError } from '@/src/shared/errors/AppError';

@injectable()
class CreateTaskService {
    constructor(
		@inject('TasksRepository')
		private tasksRepository: ITasksRepository
    ) { }
    
    async execute({ title, content, progress = 1, concluded = false, user_id, category_id }: ICreateTasksProps) {
        try {
            if (title == '' || content == '' || user_id == '' || category_id == '') {
                throw new AppError('Erro ao criar a tarefa: ', 400);
            }
            const task = await this.tasksRepository.create({
                title,
                content,
                progress,
                concluded,
                user_id,
                category_id
            });
            return task;
        } catch (err) {
            throw new AppError('Ocorreu um erro no servidor', 500);
        }
    }
}

export { CreateTaskService };