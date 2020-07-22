import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}
class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        // se esse usuário não for encontrado
        if (!user) {
            throw new Error('Incorrect email/password combination.'); // não vou falar explicitamente que o email esta errado pq isso pode abrir brecha para fraude (a pessoa fica tentando varios emails, por exemplo)
        }

        // user.password - Senha criptografada que esta no banco de dados
        // password - Senha não criptografada

        const passwordMatched = await compare(password, user.password);

        // se a senha não bater
        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        // se passou até aqui -> usuário autenticado
        return {
            user,
        };
    }
}

export default AuthenticateUserService;
