import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoutegeosService } from './routegeos.service';
import { CreateRoutegeoDto } from './dto/create-routegeo.dto';
import { UpdateRoutegeoDto } from './dto/update-routegeo.dto';
import { Routegeo } from './entities/routegeo.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
@ApiTags('RouteGeos')
@Controller('routegeos')
export class RoutegeosController {
  constructor(private readonly routegeosService: RoutegeosService) {}

  @Post()
  @ApiResponse({status:201, description:'Routegeo Creado exitosamente', type: Routegeo})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createRoutegeoDto: CreateRoutegeoDto) {
    return this.routegeosService.create(createRoutegeoDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.routegeosService.findAll(paginationDto);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.routegeosService.remove(id);
  }
}
