import { UserDTO } from '../models/User';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDTO | null>
}