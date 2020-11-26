import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new SendForgotPasswordEmailService(
            fakeUsersRepository,
        );

        // o que eu espero desse service em um primero momento? -> que algum email tenha sido enviado
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
});
