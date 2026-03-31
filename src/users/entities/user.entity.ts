import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from '../enums/role.enum';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Shirt } from 'src/shirts/entities/shirt.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  hasAccepterNewsletter: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => Shirt, (shirt) => shirt.user)
  shirts: Shirt[];
}
