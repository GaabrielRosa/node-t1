import { ClientRepository } from '../repositories/ClientRepository';

export const clientRepositoryMock: jest.Mocked<ClientRepository> = {
  findAll: jest.fn(),
};
