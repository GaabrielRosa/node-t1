import { User } from '../models/User';

export interface UserService {
  findByEmail(email: string): Promise<User>;
}