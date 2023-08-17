import { IUsersFindBy, IUsersProps, IUsersReturn } from '../../dtos/UsersDTO'

export interface IUpdateProps {
    user_id: string;
    avatar: string;
}

export interface IResponseCreate {
	id: string;
	name: string;
	email: string;
}

export interface IUsersRepository {

  	create({ name, email, password }: IUsersProps): Promise<IResponseCreate>;

	update({ user_id, avatar }: IUpdateProps): Promise<IUsersFindBy>;

	findByEmail(email: string): Promise<IUsersFindBy | null>;

	findById(id: string): Promise<IUsersFindBy | null>

	list(): Promise<IUsersReturn[]>;

}
