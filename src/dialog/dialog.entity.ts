import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column, ManyToMany } from 'typeorm/index';

import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Entity('dialogs')
export class Dialog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.dialogs)
  users: User[];

  @ManyToMany(() => Message, message => message.dialogs)
  messages: Message[];
}
