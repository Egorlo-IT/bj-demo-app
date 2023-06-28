import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UsersEntity } from './app/users/users.entity';
import { TasksEntity } from './app/tasks/tasks.entity';

@Injectable()
export class MongoConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      authSource: 'admin',
      type: 'mongodb',
      database: 'bj-demo-app',
      username: 'supervisor',
      password: 'CjajrkER<1997!',
      synchronize: true,
      logging: ['query', 'error'],
      entities: [UsersEntity, TasksEntity],
      migrations: [],
      subscribers: [],
      useUnifiedTopology: true,
    };
  }
}
