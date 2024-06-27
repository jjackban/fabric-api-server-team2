import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<number> {
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(+id);
  }
}