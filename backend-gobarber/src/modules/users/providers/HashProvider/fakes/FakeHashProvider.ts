import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload; // vou retornar a senha sem o hash, pq nos testes eu não preciso gravar a senha cruptografada
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return payload === hashed;
    }
}

export default FakeHashProvider;
