import CacheProvider from '../CacheProvider/models/CacheProvider';

export const cacheProviderMock: jest.Mocked<CacheProvider> = {
  save: jest.fn(),
  recover: jest.fn(),
};
