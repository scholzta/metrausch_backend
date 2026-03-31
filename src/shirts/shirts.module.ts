import { Module } from '@nestjs/common';
import { ShirtsController } from './shirts.controller';
import { ShirtsService } from './shirts.service';
import { Shirt } from './entities/shirt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shirt])],
  controllers: [ShirtsController],
  providers: [ShirtsService]
})
export class ShirtsModule {}
