import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';
import { RedeemSuscriptionDto } from './dto/redeem-suscription.dto';
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

    // get suscripcion title free
    @Get('free')
    findFree() {
        return this.suscriptionsService.suscriptionFree();
    }

    // get suscription title monthly
    @Get('monthly')
    findMonthly() {
        return this.suscriptionsService.suscriptionMonthly();
    }

    // get suscription title annual
    @Get('annual')
    findAnnual() {
        return this.suscriptionsService.suscriptionAnnual();
    }

    @Get('/:id')
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

    // canjear suscripcion
    @Post('redeem')
    redeem(@Body() redeemSuscriptionDto: RedeemSuscriptionDto) {
        return this.suscriptionsService.redeem(redeemSuscriptionDto);
    }

    // get all suscriptions by mall
    @Get('mall/:id')
    findByMall(@Param('id') id: number) {
        return this.suscriptionsService.findAllByMall(id);
    }

    /*  */


}
