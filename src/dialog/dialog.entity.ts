import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column, JoinTable, ManyToMany } from 'typeorm/index';

import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Entity('dialogs')
export class Dialog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  name?: string;

  @ManyToMany(() => User, user => user.dialogs, { cascade: true })
  users: User[];

  @ManyToMany(() => Message, message => message.dialogs, { cascade: true })
  @JoinTable({
    name: 'dialogs_messages',
    joinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'message_id', referencedColumnName: 'id' },
  })
  messages: Message[];
}
