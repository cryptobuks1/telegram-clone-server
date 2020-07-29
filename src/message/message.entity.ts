import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm/index';

import { Dialog } from '../dialog/dialog.entity';
import { User } from '../user/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  owner: User;

  @JoinTable({
    name: 'messages_dialogs',
    joinColumn: { name: 'message_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
  })
  @ManyToMany(() => Dialog, dialog => dialog.messages)
  dialogs: Dialog[];
}
