import { Module } from '@nestjs/common';
import { BandsController } from './bands.controller';
import { BandsService} from './bands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Band } from './entities/band.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Band])],
  controllers: [BandsController],
  providers: [BandsService]
})
export class BandsModule {}
