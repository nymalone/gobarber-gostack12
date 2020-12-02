import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeMailProvider = new FakeMailProvider();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeMailProvider,
            fakeUsersRepository,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail'); // que identificar se esse método sendMail foi enviado

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        // o que eu espero desse service em um primero momento? -> que algum email tenha sido enviado
        await sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
        });

        // espero que a função sendMail tenha sido chamada
        expect(sendMail).toHaveBeenCalled();
    });

    it('should not me able to recover a non existing user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    // vou testar se quando eu faço uma recuperação de senha válida, ele faz a geração do token
    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
