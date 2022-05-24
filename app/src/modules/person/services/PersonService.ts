import { Person } from '../models/Person';

export interface PersonService  {
  findAll(): Promise<Person[]>;
}
