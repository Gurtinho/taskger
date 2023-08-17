import { container } from 'tsyringe';
import '@/src/prisma/prisma.symbols';

import { IUsersRepository } from '@/src/modules/accounts/repositories/prisma/IUsersRepository';
import { UsersRepository } from '@/src/modules/accounts/repositories/prisma/UsersRepository';

import { ITasksRepository } from '@/src/modules/tasks/repositories/prisma/ITasksRepository';
import { TasksRepository } from '@/src/modules/tasks/repositories/prisma/TasksRepository';

import { ICategoryRepository } from '@/src/modules/categories/repositories/ICategoryRepository';
import { CategoryRepository } from '@/src/modules/categories/repositories/CategoryRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<ITasksRepository>(
    'TasksRepository',
    TasksRepository
);

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
);