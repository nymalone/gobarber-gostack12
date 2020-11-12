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

    // it('should not be able to create two appointments on the same time', () => {
    //     expect(1 + 2).toBe(3);
    // });
});
