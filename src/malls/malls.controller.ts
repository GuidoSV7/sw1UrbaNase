import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MallsService } from './malls.service';
import { CreateMallDto } from './dto/create-mall.dto';
import { UpdateMallDto } from './dto/update-mall.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Mall } from './entities/mall.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('malls')
export class MallsController {
    constructor(private readonly mallsService: MallsService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Mall Creado exitosamente', type: Mall })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    create(@Body() createMallDto: CreateMallDto) {
        return this.mallsService.create(createMallDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.mallsService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.mallsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number,
        @Body() updateMallDto: UpdateMallDto) {
        return this.mallsService.update(id, updateMallDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.mallsService.remove(id);
    }
}
