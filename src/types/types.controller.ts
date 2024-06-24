import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Type } from './entities/type.entity';
@ApiTags('Types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @ApiResponse({status:201, description:'Type Creado exitosamente', type: Type})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.typesService.findAll(paginationDto);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.typesService.remove(id);
  }
}
