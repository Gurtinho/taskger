/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';
import toast from 'react-hot-toast';
import jwt_decode from 'jwt-decode';


interface IUserProps {
    id: string;
    name: string;
    email: string;
}

interface IUserContextData {
    user: IUserProps | undefined;
    isAuthenticated: boolean;
    signin: (credentials: SigninProps) => Promise<void>;
    signup: (credentials: SignupProps) => Promise<void>;
    signout: () => Promise<void>;
    checkToken: () => void;
}

interface SignupProps {
    name: string;
    email: string;
    password: string;
}

interface SigninProps {
    email: string;
    password: string;
}

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as IUserContextData);

export const useAuth = () => {
    const { user } = useContext(AuthContext);
    const isAuthenticated = !!user;
    const verifyToken = () => {
        const token = Cookies.get('sessiontoken');
        if (token) {
            try {
                const decodedToken: any = jwt_decode(token);
                const expirationDate = new Date(decodedToken.exp * 1000);
                if (expirationDate > new Date()) {
                    return true;
                }
            } catch (error) {
                console.log(error);
            }
        }
        return false;
    };
    return { user, isAuthenticated, verifyToken };
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUserProps>();
    const isAuthenticated = !!user;
    const navigate = useNavigate();

    const signup = async ({ name, email, password }: SignupProps) => {
        try {
            const response = await api.post('/users', {
                name, email, password
            });
            Cookies.set('sessiontoken', response.data.token,
                {
                    expires: 30,
                    path: '/'
                }
            );
            const { id, token } = response.data;
            setUser({
                id,
                name,
                email
            });
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            navigate('/dashboard');
        } catch {
            toast.error('Erro ao criar conta');
        }
    }
    
    const signin = async ({email, password}: SigninProps) => {
        try {
            const response = await api.post('/session', {
                email, password
            });
            Cookies.set('sessiontoken', response.data.token,
                {
                    expires: 30,
                    path: '/'
                }
            );
            const { id, name, token } = response.data;
            setUser({
                id,
                name,
                email
            });
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            navigate('/dashboard');
        } catch {
            toast.error('Erro ao fazer login');
        }
    }

    const signout = async () => {
        try {
            Cookies.remove('sessiontoken');
            navigate('/signin');
        } catch {
            toast.error('Erro ao deslogar');
        }
    }

    const checkToken = () => {
        try {
            const token = Cookies.get('sessiontoken');
            if (token) {
                navigate('/dashboard');
            } else {
                navigate('/signin');
                toast.error('Faça login novamente');
            }
        } catch {
            toast.error('Erro ao redirecionar');
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signin, signup, signout, checkToken }}>
            {children}
        </AuthContext.Provider>
    )
}