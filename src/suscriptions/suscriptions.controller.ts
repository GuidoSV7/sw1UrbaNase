import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Suscription } from './entities/suscription.entity';

@ApiTags('Suscriptions')
@Controller('suscriptions')
export class SuscriptionsController {
    constructor(private readonly suscriptionsService: SuscriptionsService) { }

    @Post()
    // @Auth(ValidRoles.admin)
    @ApiResponse({ status: 201, description: 'Suscription Creada exitosamente', type: Suscription })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    create(@Body() createSuscriptionsDto: CreateSuscriptionDto) {
        return this.suscriptionsService.create(createSuscriptionsDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.suscriptionsService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.suscriptionsService.findOne(id);
    }

    // @Auth(ValidRoles.admin)
    @Patch(':id')
    update(@Param('id') id: number,
        @Body() updateSuscriptionDto: UpdateSuscriptionDto) {
        return this.suscriptionsService.update(id, updateSuscriptionDto);
    }

    // @Auth(ValidRoles.admin)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.suscriptionsService.remove(id);
    }

    @Get('user/:id')
    findByUser(@Param('id') id: string) {
        return this.suscriptionsService.findAllByUser(id);
    }
}