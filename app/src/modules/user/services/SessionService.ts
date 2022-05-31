import { User } from '../models/User';

interface SessionCredentialsDTO {
  email: string;
  password: string;
}

interface ResponseSessionDTO {
  user: User;
  token: string;
}

interface SessionService {
  auth(credentials: SessionCredentialsDTO): Promise<ResponseSessionDTO>;
}

export { ResponseSessionDTO, SessionCredentialsDTO, SessionService }