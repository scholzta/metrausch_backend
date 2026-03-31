import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { BandsModule } from './bands/bands.module';
import { ActivitiesModule } from './activities/activities.module';
import { FestivalConfigModule } from './festivalConfig/festival-config.module';
import { StagesModule } from './stages/stages.module';
import { EventsModule } from './events/events.module';
import { FaqModule } from './faq/faq.module';
import { ShirtsModule } from './shirts/shirts.module';
import { PromoCodeModule } from './promo-code/promo-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      })
    }),
    UsersModule,
    AuthModule,
    TicketsModule,
    BandsModule,
    ActivitiesModule,
    StagesModule,
    EventsModule,
    FestivalConfigModule,
    FaqModule,
    ShirtsModule,
    PromoCodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
