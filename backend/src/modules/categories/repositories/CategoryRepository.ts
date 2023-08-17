import { executePrisma } from '@/src/prisma/prisma';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from './ICategoryRepository';
import { ICreateDTO, IGetCategoryDTO, IResponseDTO } from '../dtos/ICategoryDTO';

@injectable()
class CategoryRepository implements ICategoryRepository {
    constructor(
        @inject('executePrisma')
        private prismaClient: typeof executePrisma
    ) { }
    
    async create({ title, user_id }: ICreateDTO): Promise<void> {
        await this.prismaClient(prisma => {
            return prisma.category.create({
                data: {
                    title: title,
                    user_id: user_id
                }
            });
        });
    }

    async list(): Promise<IResponseDTO[]> {
        const categories = await this.prismaClient(prisma => {
            return prisma.category.findMany({
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                    updated_at: true,
                    task: {
                        select: {
                            id: true,
                            title: true,
                            message: true,
                            content: true,
                            option: true,
                            progress: true,
                            concluded: true,
                            category_id: true,
                            created_at: true,
                            updated_at: true
                        }
                    }
                }
            });
        });
        return categories;
    }

    async get(id: string): Promise<IGetCategoryDTO | null> {
        const category = await this.prismaClient(prisma => {
            return prisma.category.findFirst({
                where: {
                    id
                },
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                    updated_at: true,
                    task: {
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
                    }
                }
            });
        });
        return category;
    }
}

export { CategoryRepository };