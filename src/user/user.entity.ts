import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable, ManyToMany, OneToMany } from 'typeorm/index';

import { Dialog } from '../dialog/dialog.entity';
import { Message } from '../message/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @JoinTable({
    name: 'users_dialogs',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
  })
  @ManyToMany(() => User, user => user.dialogs)
  dialogs: Dialog[];

  @OneToMany(() => Message, message => message.owner)
  messages: Message[];
}
