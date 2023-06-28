import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UsersEntity } from './users.entity';
import { hash } from '../../utils/crypto';
import { Role } from '../auth/role/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {
    const addUser = async () => {
      const user = await this.findByName('admin');
      if (!user) {
        const _userEntity = new UsersEntity();
        _userEntity.id = uuid();
        _userEntity.name = 'admin';
        _userEntity.password = await hash('123');
        _userEntity.role = Role.Admin;
        await this.usersRepository.save(_userEntity);
        return;
      }
      return;
    };

    addUser();
  }

  async findById(id: string): Promise<UsersEntity | null> {
    const data = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    return data;
  }

  async findByEmail(email: string): Promise<UsersEntity> {
    const data = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    return data;
  }

  async findByName(name: string): Promise<UsersEntity | null> {
    const data = await this.usersRepository.findOne({
      where: {
        name: name,
      },
    });
    return data;
  }
}
