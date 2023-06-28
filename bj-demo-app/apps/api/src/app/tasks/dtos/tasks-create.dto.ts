import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class TasksCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'User name', description: 'User name' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'User email',
    description: 'User email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Task description',
    description: 'Task description',
  })
  description: string;
}
