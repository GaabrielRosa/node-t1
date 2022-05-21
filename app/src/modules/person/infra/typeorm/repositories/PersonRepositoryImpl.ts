import { PersonDTO } from '@modules/person/models/Person';
import { PersonRepository } from '@modules/person/repositories/PersonRepository';
import { getDbConnection } from '@shared/infra/typeorm';
import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { Person } from '../entities/Person';

injectable()
class PersonRepositoryImpl implements PersonRepository {
  private repository: Repository<Person>

  constructor() {
  
  }

  async findAll(): Promise<PersonDTO[]> {
    const dataSource = await getDbConnection();
    this.repository = dataSource.getRepository(Person)

    const personList = await this.repository.find();

    return personList;
  }

}

export { PersonRepositoryImpl }
