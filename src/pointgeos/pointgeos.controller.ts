import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointgeosService } from './pointgeos.service';
import { CreatePointgeoDto } from './dto/create-pointgeo.dto';
import { UpdatePointgeoDto } from './dto/update-pointgeo.dto';

@Controller('pointgeos')
export class PointgeosController {
  constructor(private readonly pointgeosService: PointgeosService) {}

  @Post()
  create(@Body() createPointgeoDto: CreatePointgeoDto) {
    return this.pointgeosService.create(createPointgeoDto);
  }

  @Get()
  findAll() {
    return this.pointgeosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointgeosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointgeoDto: UpdatePointgeoDto) {
    return this.pointgeosService.update(+id, updatePointgeoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointgeosService.remove(+id);
  }
}