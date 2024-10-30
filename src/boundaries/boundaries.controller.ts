import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BoundariesService } from './boundaries.service';
import { CreateBoundaryDto } from './dto/create-boundary.dto';
import { UpdateBoundaryDto } from './dto/update-boundary.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Boundary } from './entities/boundary.entity';

@ApiTags('Boundaries')
@Controller('boundaries')
export class BoundariesController {
    constructor(private readonly boundariesService: BoundariesService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Boundary Creado exitosamente', type: Boundary })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    create(@Body() createBoundaryDto: CreateBoundaryDto) {
        return this.boundariesService.create(createBoundaryDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.boundariesService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.boundariesService.findOne(id);
    }

    // get boundaries by mall
    @Get('mall/:id')
    findByMall(@Param('id') id: number) {
        return this.boundariesService.findByMall(id);
    }

    @Patch(':id')
    update(@Param('id') id: number,
        @Body() updateBoundaryDto: UpdateBoundaryDto) {
        return this.boundariesService.update(id, updateBoundaryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.boundariesService.remove(id);
    }
}
