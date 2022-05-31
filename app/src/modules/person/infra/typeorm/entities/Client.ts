import { ClientDTO } from '@modules/person/models/Client';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('client')
export class Client implements ClientDTO {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
