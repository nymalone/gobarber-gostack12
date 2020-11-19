import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        // rename -> movo um arquivo de um lado para o outro
        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.directory, 'uploads', file),
        );
    }

    public async deleteFile(file: string): Promise<void> {}
}

export default DiskStorageProvider;
