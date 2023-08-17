import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from './CreateUserService';
import { AppError } from '@/src/shared/errors/AppError';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
      	try {
			const { name, email, password } = req.body;
			const createUserService = container.resolve(CreateUserService);
			const user = await createUserService.execute({ name, email, password });
			return res.status(200).json(user);
		} catch (err) {
			throw new AppError('Ocorreu um erro no servidor' + err, 400);
		}
    }
}

export { CreateUserController };
