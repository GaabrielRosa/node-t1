import { PersonDTO } from '@modules/person/models/Person';
import { Column, Entity } from 'typeorm';

@Entity('person')
export class Person implements PersonDTO {
  @Column()
  id: string;

  @Column()
  nome: string;
}
