import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata, Patch, Param, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('businessman')
    getUserBusinessman(@Query() paginationDto:PaginationDto) {
        return this.usersService.getBusinessman(paginationDto);
    }

    @Get('user')
    getUser(@Query() paginationDto:PaginationDto) {
        return this.usersService.getUser(paginationDto);
    }

    @Patch('desactivate/:id')
    desactivateUser(@Param('id') user: string) {
        return this.usersService.desactivateUser(user);
    }

    @Patch('activate/:id')
    activateUser(@Param('id') user: string) {
        return this.usersService.activateUser(user);
    }
}
