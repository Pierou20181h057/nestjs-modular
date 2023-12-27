import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dtos';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users:  User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];
  findAll() {
    return this.users;
  }
  findOne(id: number) {
    const users = this.users.find((item) => item.id == id);
    if (!users) {
      throw new NotFoundException(`users #${id} not found`);
    }
    return users;
  }
  create(payload: CreateUserDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newUsers = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUsers);
    return newUsers;
  }
  update(id: number, payload: UpdateUserDto) {
    const users = this.findOne(id);
    if (users) {
      const usersFound = this.users.findIndex((item) => item.id == id);
      this.users[usersFound] = {
        ...users,
        ...payload,
      };
      return this.users[usersFound];
    }
    return null;
  }
  delete(id: number) {
    const usersFound = this.users.findIndex((item) => item.id == id);
    let message = '';
    if (usersFound >= 0) {
      this.users.splice(usersFound, 1);
      message = `users ${id} delete`;
    } else {
      throw new NotFoundException(`users #${id} not found`);
    }
    return message;
  }
}
