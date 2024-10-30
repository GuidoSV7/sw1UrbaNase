import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KmlsService } from './kmls.service';
import { CreateKmlDto } from './dto/create-kml.dto';
import { UpdateKmlDto } from './dto/update-kml.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Kml } from './entities/kml.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Kmls')
@Controller('kmls')
export class KmlsController {
    constructor(private readonly kmlsService: KmlsService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Kml Creado exitosamente', type: Kml })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    create(@Body() createKmlDto: CreateKmlDto) {
        return this.kmlsService.create(createKmlDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.kmlsService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.kmlsService.findOne(id);
    }

    // get kml by mall id
    @Get('mall/:id')
    findByMall(@Param('id') id: number) {
        return this.kmlsService.findByMall(id);
    }

    @Patch(':id')
    update(@Param('id') id: number,
        @Body() updateKmlDto: UpdateKmlDto) {
        return this.kmlsService.update(id, updateKmlDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.kmlsService.remove(id);
    }
}
