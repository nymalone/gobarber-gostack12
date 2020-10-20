/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    // vou verificar se o meu erro é uma instacia da classe AppError
    if (err instanceof AppError) {
        // se for quer dizer que foi um erro originado pela minha aplicação
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    // se for um erro que eu não conheço
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('🚀  Server started on port 3333!');
});
