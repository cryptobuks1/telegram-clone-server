import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable, ManyToMany } from 'typeorm/index';

import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Entity('dialogs')
export class Dialog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, user => user.dialogs, { cascade: true })
  users: User[];

  @ManyToMany(() => Message, message => message.dialogs)
  @JoinTable({
    name: 'dialogs_messages',
    joinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'message_id', referencedColumnName: 'id' },
  })
  messages: Message[];
}
