export interface ClientDTO {
  id: string;
  name: string;
}

export class Client {
  id: string;
  name: string;

  getTableName(): string {
    return 'client'
  }
}
