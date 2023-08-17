import { Router } from 'express';
const router = Router();

import { usersRouter } from './routes/users.routes';
import { sessionRouter } from './routes/session.routes';
import { tasksRouter } from './routes/tasks.routes';
import { categoryRouter } from './routes/category.routes';

router.use(usersRouter);
router.use(sessionRouter);
router.use(tasksRouter);
router.use(categoryRouter);

export { router };
