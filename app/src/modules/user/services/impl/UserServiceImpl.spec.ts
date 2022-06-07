import { userRepositoryMock, userDataMock } from '@modules/user/mocks/UserMock';
import AppError from '@shared/errors/AppError';
import { UserServiceImpl } from './UserServiceImpl';

const userService = new UserServiceImpl(userRepositoryMock);

describe('UserService', () => {
  describe('Find By Email', () => {
    it('should be able list user with email test@test.com', async () => {
      userRepositoryMock.findByEmail.mockResolvedValueOnce(userDataMock);
            
      const user = await userService.findByEmail(userDataMock.email);

      expect(user).toHaveProperty('email',userDataMock.email);
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(userDataMock.email);
    });

    it('should return an error when not finding a user by the given email', async () => {
      userRepositoryMock.findByEmail.mockResolvedValueOnce(null);

      await userService.findByEmail('email-non-exists').catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
            message: `User not found`
        });
      });
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('email-non-exists');
    });
  });
});