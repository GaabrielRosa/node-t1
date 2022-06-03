import { UserRepositoryImpl } from '@modules/user/infra/typeorm/repositories/UserRepositoryImpl';
import { fakeUserRepository, userMock } from '@modules/user/mocks/UserMock';
import AppError from '@shared/errors/AppError';
import { UserServiceImpl } from './UserServiceImpl';

let userService: UserServiceImpl;

UserRepositoryImpl as jest.Mock<UserRepositoryImpl>;

describe('UserService', () => {  
  beforeAll(() => {
    userService = new UserServiceImpl(fakeUserRepository);
  });

  beforeEach(() => {
    fakeUserRepository.findByEmail.mockReset();
  });

  describe('Find By Email', () => {
    it('should be able list user with email test@test.com', async () => {
      fakeUserRepository.findByEmail.mockResolvedValueOnce(userMock);
            
      const user = await userService.findByEmail(userMock.email);

      expect(user).toHaveProperty('email',userMock.email);
      expect(fakeUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith(userMock.email);
    });

    it('should return an error when not finding a user by the given email', async () => {
      fakeUserRepository.findByEmail.mockResolvedValueOnce(null);

      await userService.findByEmail('email-non-exists').catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
            message: `User not found`
        });
      });
      expect(fakeUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith('email-non-exists');
    });
  });
});