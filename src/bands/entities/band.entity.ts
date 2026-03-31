import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('bands')
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true})
  sub: string;

  @Column()
  genre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true})
  contactName: string;

  @Column({ nullable: true})
  contactPhone: string;

  @Column({ nullable: true})
  contactEmail: string;

  @CreateDateColumn()
  createdAt: Date;
}
