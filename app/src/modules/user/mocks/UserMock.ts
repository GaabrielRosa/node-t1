import { v4 as uuidV4 } from 'uuid';

import { UserDTO } from '../models/User';

export const userMock: UserDTO = {
  id: uuidV4(),
  name: 'Test',
  email: 'test@test.com',
  password: '123456'
}

export const fakeUserRepository = {
  findByEmail: jest.fn(),
};
