import { PersonDTO } from '@modules/person/models/Person';
import { PersonRepository } from '@modules/person/repositories/PersonRepository';
import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { getRepositoryPerson } from '.';
import { Person } from '../entities/Person';

@injectable()
class PersonRepositoryImpl implements PersonRepository {
  private repository: Repository<Person>

  constructor() {
    this.repository = getRepositoryPerson;
  }

  async findAll(): Promise<PersonDTO[]> {
    const personList = await this.repository.find();

    return personList;
  }

}

export { PersonRepositoryImpl }
