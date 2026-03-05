import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosModule } from './modules/platos/platos.module';
import { CategoriesModule } from './modules/categories/categories.module';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    load: [typeorm]
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory:(config:ConfigService) => config.get("typeorm")!,
  }),
  PlatosModule,
  CategoriesModule,
],
})

export class AppModule {}
