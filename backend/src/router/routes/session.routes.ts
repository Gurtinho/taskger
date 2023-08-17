import { Router } from 'express';
const sessionRouter = Router();

import { SessionController } from '@/src/modules/accounts/useCases/sessionUser/SessionUserController';

sessionRouter.post('/session', new SessionController().handle);

export { sessionRouter };
