import { PersonDTO } from '../models/Person';

export interface PersonRepository {
  findAll(): Promise<PersonDTO[]>;
}
