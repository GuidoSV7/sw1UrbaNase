import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata, Patch, Param } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('businessman')
    getUserBusinessman() {
        return this.usersService.getBusinessman();
    }

    @Get('user')
    getUser() {
        return this.usersService.getUser();
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
