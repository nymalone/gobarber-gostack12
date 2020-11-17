import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
// toda a vez que ele tinha uma injeção de dependência com o nome HashProvider
// eu vou retornar uma instância da classe BCryptHashProvider
