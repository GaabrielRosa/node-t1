import { ClientRepository } from '@modules/person/repositories/ClientRepository';

export const clientRepositoryMock: jest.Mocked<ClientRepository> = {
  findAll: jest.fn(),
};
