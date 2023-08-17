import { executePrisma } from '@/src/prisma/prisma';
import { inject, injectable } from 'tsyringe';

import { IResponseCreate, IUpdateProps, IUsersRepository } from './IUsersRepository';
import { IUsersFindBy, IUsersProps, IUsersReturn } from '../../dtos/UsersDTO';

@injectable()
class UsersRepository implements IUsersRepository {
    constructor(
        @inject('executePrisma')
        private prismaClient: typeof executePrisma
    ) { }
    
    async create({ name, email, password }: IUsersProps): Promise<IResponseCreate> {
        const user = await this.prismaClient(async (prisma) => {
            return await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
        });
        return user;
    }

    async update({ user_id, avatar }: IUpdateProps): Promise<IUsersFindBy> {
        const user = this.prismaClient(async prisma => {
            return await prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    avatar: avatar
                }
            });
        });
        return user;
    }

    async findByEmail(email: string): Promise<IUsersFindBy | null> {
        const emailAlreadyExists = this.prismaClient(async prisma => {
            return await prisma.user.findFirst({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    avatar: true
                }
            });
        });
        return emailAlreadyExists;
    }

    async findById(id: string): Promise<IUsersFindBy | null> {
        const user_id = this.prismaClient(async prisma => {
            return await prisma.user.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    avatar: true
                }
            });
        });
        return user_id;
    }

    async list(): Promise<IUsersReturn[]> {
        const users = await this.prismaClient(async prisma => {
            return await prisma.user.findMany();
        });
        return users;
    }

}

export { UsersRepository };