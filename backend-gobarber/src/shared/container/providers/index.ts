import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvier from './StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvier,
);
