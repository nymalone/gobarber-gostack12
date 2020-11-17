export default interface IHashProvider {
    // vai gerar um hash a partit de uma string qualquer e vai retornar uma string
    generateHash(payload: string): Promise<string>;
    // vai comparar um texto qualquer com algo que ja foi hashed anteriormente e vai retornar true or false
    compareHash(payload: string, hashed: string): Promise<boolean>;
}
