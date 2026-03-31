import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoCode } from './entities/promo-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromoCode])],
  providers: [PromoCodeService],
  controllers: [PromoCodeController],
  exports: [PromoCodeService]
})
export class PromoCodeModule {}
