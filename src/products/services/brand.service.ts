import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dtos';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Taxi',
      image: '',
    },
  ];
  findAll() {
    return this.brands;
  }
  findOne(id: number) {
    const brand = this.brands.find((item) => item.id == id);
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    return brand;
  }
  create(payload: CreateBrandDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const brandFound = this.brands.findIndex((item) => item.id == id);
      this.brands[brandFound] = {
        ...brand,
        ...payload,
      };
      return this.brands[brandFound];
    }
    return null;
  }
  delete(id: number) {
    const brandFound = this.brands.findIndex((item) => item.id == id);
    let message = '';
    if (brandFound >= 0) {
      this.brands.splice(brandFound, 1);
      message = `brand ${id} delete`;
    } else {
      throw new NotFoundException(`brand #${id} not found`);
    }
    return message;
  }
}
