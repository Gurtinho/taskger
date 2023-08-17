import { Router } from 'express';

import { authenticated } from '@/src/shared/middlewares/authenticated';

import { CreateCategoryController } from '@/src/modules/categories/useCases/CreateCategory/CreateCategoryController';
import { ListCategoryController } from '@/src/modules/categories/useCases/ListCategory/ListCategoryController';
import { GetCategoryController } from '@/src/modules/categories/useCases/getCategory/GetCategoryController';

const categoryRouter = Router();

categoryRouter.post('/category', authenticated, new CreateCategoryController().handle);

categoryRouter.get('/category/:id', authenticated, new GetCategoryController().handle);

categoryRouter.get('/categories', authenticated, new ListCategoryController().handle);

export { categoryRouter };