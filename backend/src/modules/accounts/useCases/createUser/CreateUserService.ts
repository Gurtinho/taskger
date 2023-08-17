import { hash } from 'bcryptjs';
import { IUsersProps } from '../../dtos/UsersDTO';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/prisma/IUsersRepository';
import { AppError } from '@/src/shared/errors/AppError';
import { setToken } from '@/src/utils/token';

@injectable()
class CreateUserService {
    constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
    ) {}

    async execute({ name, email, password }: IUsersProps) {
		try {
			if (name == '' || email == '' || password == '') {
				throw new AppError('Dados inconsistentes.', 400);
			}
			const emailAlreadyExists = await this.usersRepository.findByEmail(email);
			if (emailAlreadyExists) {
				throw new AppError('Usuário já cadastrado.', 400);
			}
			const passwordHash = await hash(password, 8);
			const user = await this.usersRepository.create({
				name,
				email,
				password: passwordHash
			});
			return setToken(user);
      	} catch (err) {
        	throw new AppError('Ocorreu um erro no servidor' + err, 400);
      	}
    }
}

export { CreateUserService };
