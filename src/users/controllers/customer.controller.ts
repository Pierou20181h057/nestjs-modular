import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CustomerService } from 'src/services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dtos';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService){}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    // response.status(200).send({
    //   message: `product ${id}`,
    // });
    return this.customerService.findOne(id);
  }
  @Get('')
  getProducts() {
    // return {
    //   message: `products: limit = ${limit} offset= ${offset} brand= ${brand}`,
    // };
    return this.customerService.findAll();
  }
  @Post()
  create(@Body() playload: CreateCustomerDto) {
    return this.customerService.create(playload);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customerService.delete(id);
  }
}
