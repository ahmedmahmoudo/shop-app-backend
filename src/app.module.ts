import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/appConfig';
import { configValidation } from './config/configValidation';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: configValidation,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          synchronize: true,
          url: configService.get('app.database.url'),
          autoLoadEntities: true,
          logging: true,
          logger: 'file',
        };
      },
      inject: [ConfigService],
    }),
    ListModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
