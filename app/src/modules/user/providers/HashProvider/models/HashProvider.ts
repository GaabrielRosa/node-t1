export default interface HashProvider {
  generateHash(text: string): Promise<string>;
  compareHash(text: string, hashed: string): Promise<boolean>;
}
