import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Register } from './entities/register.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@ApiTags('Registers')
@Controller('registers')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Post()
  @ApiResponse({status:201, description:'Register Creada exitosamente', type: Register})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registersService.create(createRegisterDto);
  }

    @Get('user/:iduser')
  async findAllByUserId(@Param('iduser') iduser: string) {
    return await this.registersService.findAllByUserId(iduser);
  }


  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.registersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.registersService.findOne(id);
  }

 
 
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.registersService.remove(id);
  }
}
