import { forwardRef, Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage]),
    forwardRef(() => EventsModule)
  ],
  controllers: [StagesController],
  providers: [StagesService],
  exports: [StagesService, TypeOrmModule]
})
export class StagesModule {}
