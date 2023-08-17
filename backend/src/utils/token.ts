import { sign } from 'jsonwebtoken';

interface IUserProps {
    id: string;
    name: string;
    email: string;
}

interface IResponse {
    user: {
		id: string;
		name: string;
		email: string;
    }
    token: string;
}

export const setToken = async (user: IUserProps) => {
    const token = sign({},
        'icecream',
        {
            subject: user.id,
            expiresIn: '30d'
        }
    );
    const tokenReturn: IResponse = {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
    return tokenReturn;
}