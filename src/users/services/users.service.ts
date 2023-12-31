import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];
  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
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
  getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
