import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        // instanciei pq agora eu preciso gerar o service que vai receber como parametro o repositorio, assim como façø na base de dados passando o repositorio original
        // aqui entra muito o valor de inversão de dependências, L
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123456',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11); // assim eu consigo especificar a data que quero (ano, mes, dia, hora)

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456',
        });

        // eu espero que essa promisse rejeite, ou seja, retorne um resultado não de sucesso e que a resposta seja um erro (no caso o meu arquivo AppError)
        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
