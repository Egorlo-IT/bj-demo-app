import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  exports: [UsersService],
})
export class UsersModule {}
