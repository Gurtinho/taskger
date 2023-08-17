import { Request, Response } from 'express';

import { UploadUserAvatarService } from './UploadUserAvatarService';
import { container } from 'tsyringe';

class UploadUserAvatarController {
    async handle(req: Request, res: Response) {
        const { id } = req.user;
        const avatar = req.file!.filename;
        const uploadUserAvatarService = container.resolve(UploadUserAvatarService);
        const userAvatar = await uploadUserAvatarService.execute({ user_id: id, avatar });
        return res.status(200).json(userAvatar);
    }
}

export { UploadUserAvatarController };