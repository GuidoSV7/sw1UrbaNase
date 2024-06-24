import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Types')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  // @Auth(ValidRoles.admin)
  @ApiResponse({status:201, description:'Unidad Educativa Creada exitosamente', type: Category})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCategorieDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategorieDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.categoriesService.findAll(paginationDto);
  }

 
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
