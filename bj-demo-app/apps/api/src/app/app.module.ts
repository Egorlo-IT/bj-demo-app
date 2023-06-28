import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { MongoConfigService } from '../mongoConfigService';
import { RolesGuard } from './auth/role/roles.guard';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: MongoConfigService,
      inject: [MongoConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
