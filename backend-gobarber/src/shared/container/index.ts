import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// o id que eu coloco na minha injeção é sempre o nome do repositório
container.registerSingleton<IAppointmentsRepository>( // garante que a variavel que estou passando como segundo parâmetro  tenha exatamente o formato da minha interface
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
