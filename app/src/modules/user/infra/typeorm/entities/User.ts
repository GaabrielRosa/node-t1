import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserDTO } from '@modules/user/models/User';

@Entity('user')
export class User implements UserDTO {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;
}