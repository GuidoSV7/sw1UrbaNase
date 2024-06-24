import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutegeosService } from './routegeos.service';
import { CreateRoutegeoDto } from './dto/create-routegeo.dto';
import { UpdateRoutegeoDto } from './dto/update-routegeo.dto';

@Controller('routegeos')
export class RoutegeosController {
  constructor(private readonly routegeosService: RoutegeosService) {}

  @Post()
  create(@Body() createRoutegeoDto: CreateRoutegeoDto) {
    return this.routegeosService.create(createRoutegeoDto);
  }

  @Get()
  findAll() {
    return this.routegeosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routegeosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutegeoDto: UpdateRoutegeoDto) {
    return this.routegeosService.update(+id, updateRoutegeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routegeosService.remove(+id);
  }
}
