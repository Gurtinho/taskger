import 'reflect-metadata'
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { router } from '@/src/router';
import '@/src/shared/container/prisma';
import 'colors';
import 'dotenv/config';
import { AppError } from './shared/errors/AppError';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(router);
app.use((err: Error, req: Request, res: Response) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        error: 'Error',
        message: 'Erro interno do servidor'
    });
});

export { app };