import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/prisma/IUsersRepository';
import { AppError } from '@/src/shared/errors/AppError';
import { setToken } from '@/src/utils/token';

interface IUserProps {
	email: string;
	password: string;
}

interface IResponse {
    user: {
		id: string;
		name: string;
		email: string;
    }
    token: string;
}

@injectable()
class SessionService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IUserProps): Promise<IResponse> {
		try {
			if (email == '' || password == '') {
				throw new AppError('Dados inconsistentes.', 400);
			}
			const user = await this.usersRepository.findByEmail(email);
			if (!user) {
				throw new AppError('Dados incorretos.', 401);
			}
			const passwordMatch = await compare(password, user.password)
			if (!passwordMatch) {
				throw new AppError('Dados incorretos.', 401)
			}
			return setToken(user);
		} catch (err) {
			throw new AppError('Ocorreu um erro no servidor' + err, 401);
		}
	}
}

export { SessionService };
