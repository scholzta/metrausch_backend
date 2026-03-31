import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('shirts')
export class Shirt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @Column()
  givenOut: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

}
