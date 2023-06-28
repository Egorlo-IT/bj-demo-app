import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { TasksEntity } from './tasks.entity';
import { TasksCreateDto } from './dtos/tasks-create.dto';
import { TasksEditStatusDto } from './dtos/tasks-editStatus.dto';
import { TasksEditDto } from './dtos/tasks-edit.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>
  ) {}

  async findAll(): Promise<{ tasks: TasksEntity[] }> {
    const data = await this.tasksRepository.find();
    return { tasks: data };
  }

  async findById(id: string): Promise<TasksEntity | null> {
    const data = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
    });

    return data;
  }

  async findByEmail(email: string): Promise<TasksEntity> {
    const data = await this.tasksRepository.findOne({
      where: {
        email: email,
      },
    });

    return data;
  }

  async findByName(name: string): Promise<TasksEntity | null> {
    const data = await this.tasksRepository.findOne({
      where: {
        name: name,
      },
    });
    return data;
  }

  async create(task: TasksCreateDto) {
    const _taskEntity = new TasksEntity();
    _taskEntity.id = uuid();
    _taskEntity.name = task.name;
    _taskEntity.email = task.email;
    _taskEntity.description = task.description;
    _taskEntity.status = 'underway';
    _taskEntity.edited = 'no';
    await this.tasksRepository.save(_taskEntity);

    return true;
  }

  async edit(task: TasksEditDto) {
    const _taskEntity = new TasksEntity();

    if (task.name) _taskEntity.name = task.name;
    if (task.email) _taskEntity.email = task.email;
    if (task.description) _taskEntity.description = task.description;
    _taskEntity.edited = 'yes';

    const result = await this.tasksRepository.update(
      { id: task.id },
      _taskEntity
    );

    return result;
  }

  async editStatus(task: TasksEditStatusDto) {
    const _taskEntity = new TasksEntity();

    _taskEntity.status = 'fulfilled';

    const result = await this.tasksRepository.update(
      { id: task.id },
      _taskEntity
    );

    return result;
  }
}
