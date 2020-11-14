/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id); // quero encontrar o user onde o id é igual ao id que estou passando por parametro
        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        // procuro se o usuário já esta no meu array
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        // e ai eu vou subrescrever no meu array de usuários, na posição findIndex
        this.users[findIndex] = user;

        return user;
    }
}

export default UsersRepository;
