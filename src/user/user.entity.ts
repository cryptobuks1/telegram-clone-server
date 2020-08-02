import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BeforeInsert, JoinTable, ManyToMany, OneToMany } from 'typeorm/index';
import bcrypt from 'bcryptjs';

import { Dialog } from '../dialog/dialog.entity';
import { Message } from '../message/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => User, user => user.contact)
  contact: User[];

  @ManyToMany(() => User, user => user.contacts)
  @JoinTable({
    name: 'users_contacts',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'contact_id', referencedColumnName: 'id' },
  })
  contacts: User[];

  @ManyToMany(() => Dialog, dialog => dialog.users)
  @JoinTable({
    name: 'users_dialogs',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
  })
  dialogs: Dialog[];

  @OneToMany(() => Message, message => message.owner, { cascade: true })
  messages: Message[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
