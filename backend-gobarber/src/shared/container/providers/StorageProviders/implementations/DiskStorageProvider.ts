import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        // rename -> movo um arquivo de um lado para o outro
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        // vou verificar se o arquivo existe e só vou deletar se ele existir
        try {
            await fs.promises.stat(filePath); // stat traz informações sobre o arquivo, se ele não encontrar devolve um erro
        } catch {
            return; // se não encontrou eu paro a função por aqui
        }

        // se encontrou o arquivo
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;
