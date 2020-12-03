/* eslint-disable camelcase */
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
    // vai gerar um token para um usuário especifico
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
