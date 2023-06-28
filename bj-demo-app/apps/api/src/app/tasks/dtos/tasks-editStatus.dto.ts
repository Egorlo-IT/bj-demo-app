import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TasksEditStatusDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Public task ID', description: 'Public task ID' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Task status',
    description: 'Task status',
  })
  status: string;
}
