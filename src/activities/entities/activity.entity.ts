import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum ActivityStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  organizerName: string;

  @Column({ type: 'text', nullable: true})
  description: string;

  @Column({ type: 'text', nullable: true})
  location: string;

  @Column({ type: 'text', nullable: true})
  contactPhone: string;

  @Column({ type: 'text', nullable: true})
  contactEmail: string;

  @Column({
    type: 'enum',
    enum: ActivityStatus,
    default: ActivityStatus.PENDING,
  })
  status: ActivityStatus

  @Column({ nullable: true })
  parentId: number;

  @ManyToMany(() => User)
  @JoinTable()
  organizingUsers: User[];

  @CreateDateColumn()
  createdAt: Date;
}
