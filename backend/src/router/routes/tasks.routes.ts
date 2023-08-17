import { Router } from 'express';

import { authenticated } from '@/src/shared/middlewares/authenticated';

import { CreateTaskController } from '@/src/modules/tasks/useCases/createTask/CreateTaskController';
import { ListTaskController } from '@/src/modules/tasks/useCases/listTask/ListTaskController';
import { GetTaskController } from '@/src/modules/tasks/useCases/getTask/GetTaskController';

const tasksRouter = Router();

tasksRouter.post('/tasks', authenticated, new CreateTaskController().handle);

tasksRouter.get('/tasks', authenticated, new ListTaskController().handle);

tasksRouter.get('/tasks/:id', authenticated, new GetTaskController().handle);

export { tasksRouter };