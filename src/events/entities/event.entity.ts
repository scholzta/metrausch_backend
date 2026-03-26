import { Activity } from "../../activities/entities/activity.entity";
import { Band } from "../../bands/entities/band.entity";
import { Stage } from "../../stages/entities/stage.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class FestivalEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @ManyToOne(() => Band, { nullable: true, onDelete: 'SET NULL' })
  band: Band;

  @ManyToOne(() => Activity, { nullable: true, onDelete: 'SET NULL' })
  activity: Activity

  @Column({ nullable: true })
  customTitle: string;

  @ManyToOne('Stage', (stage: any) => stage.events, { onDelete: 'CASCADE'})
  stage: Stage;
}
