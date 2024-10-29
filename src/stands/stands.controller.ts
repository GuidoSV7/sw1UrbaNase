import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StandsService } from './stands.service';
import { CreateStandDto } from './dto/create-stand.dto';
import { UpdateStandDto } from './dto/update-stand.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stand } from './entities/stand.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Stands')
@Controller('stands')
export class StandsController {
    constructor(private readonly standsService: StandsService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Stand Creado exitosamente', type: Stand })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    create(@Body() createStandDto: CreateStandDto) {
        return this.standsService.create(createStandDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.standsService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.standsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number,
        @Body() updateStandDto: UpdateStandDto) {
        return this.standsService.update(id, updateStandDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.standsService.remove(id);
    }

}
