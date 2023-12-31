import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CustomerController } from './controllers/customer.controller';
import { UsersService } from './services/users.service';
import { CustomerService } from './services/customer.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[ProductsModule],
  controllers: [UsersController, CustomerController],
  providers: [UsersService, CustomerService],
})
export class UsersModule {}
