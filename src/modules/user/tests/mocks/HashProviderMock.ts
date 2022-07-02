import HashProvider from '@modules/user/providers/HashProvider/models/HashProvider';

export const hashProviderMock: jest.Mocked<HashProvider> = {
  generateHash: jest.fn(),
  compareHash: jest.fn(),
};
