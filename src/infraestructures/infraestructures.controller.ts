import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InfraestructuresService } from './infraestructures.service';
import { CreateInfraestructureDto } from './dto/create-infraestructure.dto';
import { UpdateInfraestructureDto } from './dto/update-infraestructure.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Infraestructure } from './entities/infraestructure.entity';
@ApiTags('Infraestructures')
@Controller('infraestructures')
export class InfraestructuresController {
  constructor(private readonly infraestructuresService: InfraestructuresService) {}

  @Post()
  // @Auth(ValidRoles.admin)
  @ApiResponse({status:201, description:'Infraestructura Creada exitosamente', type: Infraestructure})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createInfraestructuresDto: CreateInfraestructureDto) {
    return this.infraestructuresService.create(createInfraestructuresDto);
  }


  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.infraestructuresService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.infraestructuresService.findOne(id);
  }

  // @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateUnidadEducativaDto: UpdateInfraestructureDto) 
        {
    return this.infraestructuresService.update(id, updateUnidadEducativaDto);
  }
  
  // @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.infraestructuresService.remove(id);
  }
}
