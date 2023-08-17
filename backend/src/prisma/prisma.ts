import { PrismaClient } from '@prisma/client';
import { AppError } from '../shared/errors/AppError';

export async function executePrisma<T>(callback: (prisma: PrismaClient) => Promise<T>): Promise<T> {
	const prisma: PrismaClient = new PrismaClient({
		errorFormat: 'minimal'
	});
    try {
		await prisma.$connect();
		return await callback(prisma);
		await prisma.$disconnect();
	} catch (err) {
		throw new AppError('Ocorreu um erro com a comunicação com o banco de dados', 500);
	}
}
