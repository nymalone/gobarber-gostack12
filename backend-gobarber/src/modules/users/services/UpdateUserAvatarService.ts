/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs'; // filesystem do node
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload'; // FIZ ALTERAÇÃO DE CAMINHO NESSE ARQUIVO -> CRIEI O DIRECTORY

import AppError from '@shared/errors/AppError';
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

        // se ele já atinha um avatar, tenho que deletar o anterior
        if (user.avatar) {
            // vou buscar o arquivo de usuário utilizando o path no node
            const userAvatarFilePath = path.join(
                // caminho e nome do arquivo que quero deletar
                uploadConfig.directory,
                user.avatar,
            );
            // vou checar se esse arquivo realmente existe
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            ); // garanta que eu vou utilizar as funçoes do FS do node em formato de primises e não callback
            // STAT -> função que traz o status de um arquivo, porém SÓ se ele existir
            if (userAvatarFileExists) {
                // se o arquivo então existe
                await fs.promises.unlink(userAvatarFilePath); // arquivo deletado!!
            }
        }

        user.avatar = avatarFilename; // atualizo minha coluna avatar
        await this.usersRepository.save(user); // salvo no meu repositório

        return user;
    }
}

export default UpdateUserAvatarService;
