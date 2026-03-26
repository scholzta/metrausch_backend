import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagesModule } from 'src/stages/stages.module';
import { BandsModule } from 'src/bands/bands.module';
import { ActivitiesModule } from 'src/activities/activities.module';
import { FestivalEvent } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FestivalEvent]),
    forwardRef(() => StagesModule),
    forwardRef(() => BandsModule),
    ActivitiesModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, TypeOrmModule]
})
export class EventsModule {}
