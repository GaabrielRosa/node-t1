import { PersonDTO } from '@modules/person/models/Person';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('person')
export class Person implements PersonDTO {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;
}
