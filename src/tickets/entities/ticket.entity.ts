import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  category: string;

  @Column({ default: false })
  early_arrival: boolean;

  @Column({ default: false })
  entry_thursday: boolean;

  @Column({ default: false })
  entry_friday: boolean;

  @Column({ default: false })
  entry_saturday: boolean;

  @Column({ default: false })
  catering_thursday: boolean;

  @Column({ default: false })
  catering_friday: boolean;

  @Column({ default: false })
  catering_saturday: boolean;

  @Column({ default: false })
  catering_sunday: boolean;

  @Column({ default: false })
  helper: boolean;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  paid: boolean;

  @Column({ default: false })
  arrived: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

}
