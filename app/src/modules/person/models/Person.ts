export interface PersonDTO {
  id: string;
  nome: string;
}

export class Person {
  id: string;
  nome: string;

  getTableName(): string {
    return 'person'
  }
}
