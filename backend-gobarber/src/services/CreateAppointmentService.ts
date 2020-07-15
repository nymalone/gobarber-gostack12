// SÓ REGRA DE NEGÓCIO NESSE ARQUIVO

import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * ERROS PARA TRATAR APÓS MUDANÇA DE ARQUIVO
 * [x] Recebimento das informações (date, provider) -> interface
 * [x] Tratativa de erros/excessões -> o service NUNCA tem acesso ao request e response! -> então uso o throw
 * [x] Acesso ao repositório
 */

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppoitmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppoitmentInSameDate) {
            throw Error('This appointment is already booked.');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
