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
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dtos';
import { BrandService } from 'src/services/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService){}
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    // response.status(200).send({
    //   message: `product ${id}`,
    // });
    return this.brandService.findOne(id);
  }
  @Get('')
  getProducts() {
    // return {
    //   message: `products: limit = ${limit} offset= ${offset} brand= ${brand}`,
    // };
    return this.brandService.findAll();
  }
  @Post()
  create(@Body() playload: CreateBrandDto) {
    return this.brandService.create(playload);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandService.delete(id);
  }
}
