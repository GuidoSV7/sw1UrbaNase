import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Input } from './entities/input.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Inputs')
@Controller('inputs')
export class InputsController {
    constructor(private readonly inputsService: InputsService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Input Creado exitosamente', type: Input })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    create(@Body() createInputDto: CreateInputDto) {
        return this.inputsService.create(createInputDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.inputsService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.inputsService.findOne(id);
    }

    // get inputs by mall id
    @Get('mall/:id')
    findByMall(@Param('id') id: number) {
        return this.inputsService.findByMall(id);
    }

    @Patch(':id')
    update(@Param('id') id: number,
        @Body() updateInputDto: UpdateInputDto) {
        return this.inputsService.update(id, updateInputDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.inputsService.remove(id);
    }
}
