import { Person } from '@modules/person/models/Person';
import { PersonRepository } from '@modules/person/repositories/PersonRepository';
import { TYPES } from '@shared/container/types';
import { inject, injectable } from 'inversify';
import { PersonService } from '../PersonService';

@injectable()
class PersonServiceImpl implements PersonService {

  constructor(
    @inject(TYPES.PersonRepository)
    private personRepository: PersonRepository,
  ) {}


  async findAll(): Promise<Person[]> {
    const personList = await this.personRepository.findAll();
    return personList.map(dto => dto as Person);
  }

}

export { PersonServiceImpl }