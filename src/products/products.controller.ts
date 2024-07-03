import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException,UploadedFile, BadRequestException, UseInterceptors  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { send } from '../util/connectFabric';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname); // 파일의 확장자 추출 (예: .png, .jpg 등)
        cb(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`); // 파일명 설정
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) { // 이미지 파일만 허용 (여기서는 모든 이미지 포맷을 허용)
        cb(null, true);
      } else {
        cb(new BadRequestException('Uploaded file is not an image'), false);
      }
    },
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() product: Product) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    product.image = file.filename; // 이미지 파일명을 Product 객체에 할당
    await this.productsService.create(product);

    // 여기서 초기화 아이템을 전송하는 로직을 추가할 수 있음
    const args = [product.name, product.styleNum, product.brand, product.inventory];
    await send(false, 'initItem', args);
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