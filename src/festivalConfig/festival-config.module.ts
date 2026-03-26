import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FestivalConfig } from './festival-config.entity';
import { FestivalConfigController } from './festival-config.controller';
import { FestivalConfigService } from './festival-config.service';
import { FestivalEvent } from 'src/events/entities/event.entity';
import { Stage } from 'src/stages/entities/stage.entity';
import { Band } from 'src/bands/entities/band.entity';
import { Activity } from 'src/activities/entities/activity.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    FestivalConfig,
    FestivalEvent,
    Stage,
    Band,
    Activity,
    Ticket
  ])],
  controllers: [FestivalConfigController],
  providers: [FestivalConfigService],
  exports: [FestivalConfigService]
})
export class FestivalConfigModule {}
