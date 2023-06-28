import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class TasksEntity {
  @ObjectIdColumn()
  @ApiProperty({ example: 'Private tasks ID', description: 'Private tasks ID' })
  id_: string;

  @PrimaryColumn()
  @ApiProperty({ example: 'Public tasks ID', description: 'Public tasks ID' })
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
    example: 'Task description',
    description: 'Task description',
  })
  description: string;

  @Column('text')
  @ApiProperty({
    example: 'Task status',
    description: 'Task status',
  })
  status: string;

  @Column('text')
  @ApiProperty({
    example: 'Task edited status',
    description: 'Task edited status',
  })
  edited: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Date create task',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    description: 'Date update task',
  })
  updatedAt: Date;
}
