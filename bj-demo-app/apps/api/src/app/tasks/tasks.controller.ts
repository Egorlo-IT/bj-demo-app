import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';
import { TasksCreateDto } from './dtos/tasks-create.dto';
import { TasksEditDto } from './dtos/tasks-edit.dto';
import { TasksEditStatusDto } from './dtos/tasks-editStatus.dto';

@Controller('tasks')
@ApiBearerAuth()
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Tasks successfully received',
    type: TasksEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  async getAll(): Promise<{ tasks: TasksEntity[] }> {
    const tasks = await this.tasksService.findAll();
    return tasks;
  }

  @Post('create')
  @ApiOperation({ summary: 'Task creation' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully created',
    type: TasksEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  async create(@Body() task: TasksCreateDto): Promise<boolean> {
    try {
      return this.tasksService.create(task);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('editStatus')
  @ApiOperation({ summary: 'Tasks edit status' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully edit status',
    type: TasksEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  async editStatus(@Body() id: TasksEditStatusDto) {
    try {
      const result = await this.tasksService.editStatus(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Post('edit')
  @ApiOperation({ summary: 'Tasks edit' })
  @ApiResponse({
    status: 200,
    description: 'Task successfully edit',
    type: TasksEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: Error,
  })
  async edit(@Body() task: TasksEditDto) {
    try {
      const result = await this.tasksService.edit(task);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
