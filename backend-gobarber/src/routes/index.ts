import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appoitments', appointmentsRouter);
// routes.use quer dizer que toda rota que inicie com /appointments independente do tipo de rota eu vou passar para dentro do meu appointmentsRouter

export default routes;
