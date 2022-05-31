import { hash, compare } from 'bcryptjs';
import { injectable } from 'inversify';
import HashProvider from '../models/HashProvider';

@injectable()
class BCryptHashProvider implements HashProvider {
  public async generateHash(text: string): Promise<string> {
    return hash(text, 8);
  }

  public async compareHash(text: string, hashed: string): Promise<boolean> {
    return compare(text, hashed);
  }
}

export default BCryptHashProvider;
