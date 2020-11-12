/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDto';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    // crio minha variável de appointments
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => appointment.date === date,
        );

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id }); // tudo que eu tiver dentro das chaves eu vou atribuir ao meu valor da esquerda, que seria a mesma coisa que faço abaixo

        // appointment.id = uuid();
        // appointment.date = date;
        // appointment.provider_id = provider_id;

        this.appointments.push(appointment); // eu to salvando o appointment que criei dentro da variável que criei linha 11

        return appointment;
    }
}

export default AppointmentsRepository;
