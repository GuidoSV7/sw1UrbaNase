import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
const vision = require('@google-cloud/vision');

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService,

    
  ) {}
  @Post()
  @ApiResponse({status:201, description:'ProductCreado exitosamente', type: Product})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createProductDto: CreateProductDto) {
    return this.ProductsService.create(createProductDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.ProductsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ProductsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateProductDto: UpdateProductDto) 
        {
    return this.ProductsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ProductsService.remove(id);
  }

  
  visionClient = new vision.ImageAnnotatorClient();

  @Post('detect-labels')
  async detectLabels(@Body('imageUrl') imageUrl: string) {
    return this.ProductsService.detectLabels(imageUrl);
  }

  @Post('search-products')
  async searchProducts(@Body('imageUrl') imageUrl: string) {
    return this.ProductsService.searchProducts(imageUrl);
  }
}
