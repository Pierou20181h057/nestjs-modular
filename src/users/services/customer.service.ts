import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dtos';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'viery',
      lastName: 'libe',
      phone: '3111111212',
    },
  ];
  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    const customers = this.customers.find((item) => item.id == id);
    if (!customers) {
      throw new NotFoundException(`customers #${id} not found`);
    }
    return customers;
  }
  create(payload: CreateCustomerDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCustomers = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomers);
    return newCustomers;
  }
  update(id: number, payload: UpdateCustomerDto) {
    const customers = this.findOne(id);
    if (customers) {
      const customersFound = this.customers.findIndex((item) => item.id == id);
      this.customers[customersFound] = {
        ...customers,
        ...payload,
      };
      return this.customers[customersFound];
    }
    return null;
  }
  delete(id: number) {
    const customersFound = this.customers.findIndex((item) => item.id == id);
    let message = '';
    if (customersFound >= 0) {
      this.customers.splice(customersFound, 1);
      message = `customers ${id} delete`;
    } else {
      throw new NotFoundException(`customers #${id} not found`);
    }
    return message;
  }
}
