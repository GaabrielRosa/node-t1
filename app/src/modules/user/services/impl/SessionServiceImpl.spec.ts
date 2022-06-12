import { hashProviderMock } from '@modules/user/mocks/HashProviderMock';
import { userDataMock, userServiceMock } from '@modules/user/mocks/UserMock';
import { User } from '@modules/user/models/User';
import AppError from '@shared/errors/AppError';
import { SessionServiceImpl } from './SessionServiceImpl';

const sessionServiceImplMock = new SessionServiceImpl(userServiceMock, hashProviderMock);

describe('SessionService', () => {
  describe('Auth', () => {
    it('should return an error if user password incorrectly', async () => {
      userServiceMock.findByEmail.mockResolvedValueOnce(userDataMock as User);
      hashProviderMock.compareHash.mockResolvedValueOnce(false);

      await sessionServiceImplMock.auth({ email: userDataMock.email, password: 'password-invalid' }).catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
            message: `Incorrect email/password combination.`
        });
      });
      expect(userServiceMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(userServiceMock.findByEmail).toHaveBeenCalledWith(userDataMock.email);
      expect(hashProviderMock.compareHash).toHaveBeenCalledTimes(1);
      expect(hashProviderMock.compareHash).toHaveBeenCalledWith('password-invalid', userDataMock.password);
    });

    it('should be able create a new auth', async () => {
      userServiceMock.findByEmail.mockResolvedValueOnce(userDataMock as User);
      hashProviderMock.compareHash.mockResolvedValueOnce(true);

      const auth = await sessionServiceImplMock.auth({ email: userDataMock.email, password: userDataMock.password });

      expect(userServiceMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(userServiceMock.findByEmail).toHaveBeenCalledWith(userDataMock.email);
      expect(hashProviderMock.compareHash).toHaveBeenCalledTimes(1);
      expect(hashProviderMock.compareHash).toHaveBeenCalledWith(userDataMock.password, userDataMock.password);
      expect(auth).toHaveProperty('token');
    });
  });
});