import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
@Module({
  controllers: [ProductsController, CategoriesController, BrandController],
  providers: [ProductsService, BrandService],
})
export class ProductsModule {}
