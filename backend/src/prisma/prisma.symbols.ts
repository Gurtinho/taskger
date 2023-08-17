import { container } from 'tsyringe';
import { executePrisma } from './prisma';

// registro do prisma no container
container.register<typeof executePrisma>('executePrisma', {
  useValue: executePrisma
});
