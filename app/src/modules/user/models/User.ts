export interface UserDTO {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class User {
  id: string;
  email: string;
  name: string;
  password: string;

  getTableName(): string {
    return 'user'
  }
}
