import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column, CreateDateColumn, JoinColumn, ManyToMany, ManyToOne, UpdateDateColumn } from 'typeorm/index';

import { Dialog } from '../dialog/dialog.entity';
import { User } from '../user/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ name: 'is_updated', type: 'boolean', nullable: false, default: false })
  isUpdated: boolean;

  @Column({ nullable: false, type: 'text', default: 'text' })
  type: string;

  @CreateDateColumn({ name: 'created_date', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', nullable: false })
  updatedDate: Date;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  owner: User;

  @ManyToMany(() => Dialog, dialog => dialog.messages)
  dialogs: Dialog[];
}
