import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductsService  } from './products/products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'WJDtprl0328!',
    database: 'blockchaindb',
    entities: [Product],
    synchronize: true, 
  }),
  TypeOrmModule.forFeature([Product]),
],
  controllers: [AppController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
