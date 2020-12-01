// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail'); // que identificar se esse método sendMail foi enviado

        const SendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        // o que eu espero desse service em um primero momento? -> que algum email tenha sido enviado
        await SendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
        });

        // espero que a função sendMail tenha sido chamada
        expect(sendMail).toBeCalled();
    });
});
