import { NextFunction, Request, Response } from 'express';
import { executePrisma } from '@/src/prisma/prisma';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@/src/modules/accounts/repositories/prisma/UsersRepository';
import { AppError } from '../errors/AppError';

interface IPayload {
	sub: string;
}

export async function authenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const auth = req.headers.authorization;
	if (!auth) {
		throw new AppError('Necessário passar o token.', 401);
	}
	const [, token] = auth.split(' ');
	try {
		const { sub: id } = verify(token, 'icecream') as IPayload;
		const usersRepository = new UsersRepository(executePrisma);
		const founded = await usersRepository.findById(id);
		if (!founded) {
			throw new AppError('Usuário não autenticado.', 401);
		}
		req.user = {
			id: id
		}
		next()
	} catch (err) {
		throw new AppError('Token inválido.', 401);
	}
}
