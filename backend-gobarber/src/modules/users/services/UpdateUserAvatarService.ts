/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string; // uuid
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        // preciso verificar se o ID que estou recebendo é um ID de usuário válido
        const user = await this.usersRepository.findById(user_id);

        // se não encontrar o usuário
        if (!user) {
            throw new AppError(
                'Permission denied, you do not have access to change this content.',
                401,
            );
        }

        if (user.avatar) {
            this.storageProvider.deleteFile(user.avatar); // se ele ja tinha foto, eu deleto a anterior e salvo o novo usando o metodo saveFile
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = fileName; // atualizo minha coluna avatar
        await this.usersRepository.save(user); // salvo no meu repositório

        return user;
    }
}

export default UpdateUserAvatarService;
