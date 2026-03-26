import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FestivalConfig {
  @PrimaryColumn({ default: 1})
  id: number = 1;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  location: string;
}

