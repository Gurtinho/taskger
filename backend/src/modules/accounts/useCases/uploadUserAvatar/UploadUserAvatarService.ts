import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/prisma/IUsersRepository';
import { IUsersReturn } from '../../dtos/UsersDTO';
import { AppError } from '@/src/shared/errors/AppError';
import { deleteFile } from '@/src/config/deleteFile';

interface IRequest {
    user_id: string;
    avatar: string;
}

@injectable()
class UploadUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatar }: IRequest): Promise<IUsersReturn> {
        try {
            const userAvatar = await this.usersRepository.findById(user_id);
            if (userAvatar?.avatar) {
                await deleteFile('./images/avatar', userAvatar.avatar);
            }
            const user = await this.usersRepository.update({ user_id, avatar });
            return user;
        } catch (err) {
            throw new AppError('Não foi possível enviar o avatar.', 400);
        }
    }

}

export { UploadUserAvatarService };