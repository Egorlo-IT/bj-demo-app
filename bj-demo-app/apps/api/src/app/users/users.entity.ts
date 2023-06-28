import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../auth/role/roles.enum';
import { IsEnum } from 'class-validator';

@Entity('users')
export class UsersEntity {
  @ObjectIdColumn()
  @ApiProperty({ example: 'Private user ID', description: 'Private user ID' })
  id_: string;

  @PrimaryColumn()
  @ApiProperty({ example: 'Public user ID', description: 'Public user ID' })
  id: string;

  @Column('text')
  @ApiProperty({ example: 'User name', description: 'User name' })
  name: string;

  @Column('text')
  @ApiProperty({
    example: 'User email',
    description: 'User email',
  })
  email: string;

  @Column('text')
  @ApiProperty({
    example: 'User password',
    description: 'User password',
  })
  password: string;

  @Column('text')
  @IsEnum(Role)
  @ApiProperty({
    example: 'User role',
    description: 'User role',
  })
  role: Role;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Date create user',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Date update user',
  })
  updatedAt: Date;
}
