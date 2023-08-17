import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from './ITasksRepository';
import { executePrisma } from '@/src/prisma/prisma';
import { ICreateTasksProps, ICreateTasksResponse, IGetTasksResponse, IListTasksResponse } from '../../dtos/ITaskDTO';

@injectable()
class TasksRepository implements ITasksRepository {
    constructor(
        @inject('executePrisma')
        private prismaClient: typeof executePrisma
    ) { }

    async create({ title, content, progress, concluded, user_id, category_id }: ICreateTasksProps): Promise<ICreateTasksResponse> {
        const task = await this.prismaClient(prisma => {
            return prisma.task.create({
                data: {
                    title,
                    content,
                    progress,
                    concluded,
                    user_id,
                    category_id
                },
                select: {
                    title: true,
                    content: true,
                    progress: true,
                    concluded: true
                }
            });
        });
        return task;
    }

    async list(): Promise<IListTasksResponse[]> {
        const tasks = await this.prismaClient(prisma => {
            return prisma.task.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    progress: true,
                    concluded: true,
                    created_at: true
                }
            });
        });
        return tasks;
    }

    async get(id: string): Promise<IGetTasksResponse | null> {
        const task = await this.prismaClient(prisma => {
            return prisma.task.findFirst({
                where: {
                    id
                },
                select: {
                    id: true,
                    title: true,
                    message: true,
                    content: true,
                    progress: true,
                    concluded: true,
                    category_id: true,
                    created_at: true,
                    updated_at: true
                }
            });
        });
        return task;
    }
}

export { TasksRepository };