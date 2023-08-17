import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SessionService } from './SessionUserService';

class SessionController {
    async handle(req: Request, res: Response) {
		const { email, password } = req.body;
		const sessionService = container.resolve(SessionService);
		const usertoken = await sessionService.execute({ email, password });
		return res.status(200).json(usertoken);
    }
}

export { SessionController };
