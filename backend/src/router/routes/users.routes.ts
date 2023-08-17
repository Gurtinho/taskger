import { Router } from 'express';
import multer from 'multer';
const usersRouter = Router();

import { upload } from '@/src/config/upload';
import { authenticated } from '@/src/shared/middlewares/authenticated';

import { CreateUserController } from '@/src/modules/accounts/useCases/createUser/CreateUserController';
import { UploadUserAvatarController } from '@/src/modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarController';

const uploadAvatar = multer(upload('./images/avatar'));

usersRouter.post('/users',
    new CreateUserController().handle
);

usersRouter.patch('/users/avatar',
    authenticated,
    uploadAvatar.single('avatar'),
    new UploadUserAvatarController().handle
);

export { usersRouter };