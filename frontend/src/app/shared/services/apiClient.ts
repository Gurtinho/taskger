/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../contexts/AuthContext';

const apiClient = (context = null) => {
    const api = axios.create({
        baseURL: 'http://localhost:5555',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('sessiontoken')}`
        }
    });
    api.interceptors.request.use(
        (config) => {
            return config;
        },
        (error: AxiosError) => {
            if (error.response?.status === 401) { // não autorizado
                if (typeof window !== 'undefined') {
                    const { signout } = useContext(AuthContext);
                    signout();
                } else {
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );
    return api;
}

export const api = apiClient();