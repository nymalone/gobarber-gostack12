import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { email },
        });
        if (checkUserExists) {
            throw new Error('Email address already userd.');
        }

        const user = userRepository.create({
            name,
            email,
            password,
        });
        await userRepository.save(user); // vai salvar o user na base

        return user;
    }
}

export default CreateUserService;
