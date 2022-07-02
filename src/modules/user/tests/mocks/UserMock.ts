import { randomUUID } from 'crypto';

import { UserDTO } from '@modules/user/models/User';
import { UserRepository } from '@modules/user/repositories/UserRepository';
import { UserService } from '@modules/user/services/UserService';

export const userDataMock: UserDTO = {
  id: randomUUID(),
  name: 'Test',
  email: 'test@test.com',
  password: '123456'
}

export const userRepositoryMock: jest.Mocked<UserRepository> = {
  findByEmail: jest.fn(),
};

export const userServiceMock: jest.Mocked<UserService> = {
  findByEmail: jest.fn(),
};
