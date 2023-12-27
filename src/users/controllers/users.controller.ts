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
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dtos';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    // response.status(200).send({
    //   message: `product ${id}`,
    // });
    return this.usersService.findOne(id);
  }
  @Get('')
  getProducts() {
    // return {
    //   message: `products: limit = ${limit} offset= ${offset} users= ${users}`,
    // };
    return this.usersService.findAll();
  }
  @Post()
  create(@Body() playload: CreateUserDto) {
    return this.usersService.create(playload);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
