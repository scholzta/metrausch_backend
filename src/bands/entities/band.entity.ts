import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('bands')
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
