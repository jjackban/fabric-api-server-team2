import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { Product } from './products/entities/product.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ProductsService: ProductsService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/init')
  async init(
    @Query('user') user: string,
    @Query('userval') userval: string,
  ): Promise<string> {
    return this.appService.init(user, userval);
  }

  @Get('/invoke')
  async invoke(
    @Query('sender') sender: string,
    @Query('reciever') reciever: string,
    @Query('value') value: string,
  ): Promise<string> {
    return this.appService.invoke(sender, reciever, value);
  }

  @Get('/query')
  async query(
    @Query('name') name: string,
  ): Promise<string> {
    return this.appService.query(name);
  }

  @Get('/delete')
  async delete(
    @Query('name') name: string,
  ): Promise<string> {
    return this.appService.delete(name);
  }
  
  @Post('/create')
  async create(@Body() product: Product): Promise<Product> {
    return this.ProductsService.create(product);
  }
}