import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { FestivalEvent } from '../../events/entities/event.entity';

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany('FestivalEvent', (event: any) => event.stage)
  events: FestivalEvent[];
}
