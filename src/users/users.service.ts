import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // Buscar usuarios que tengan el rol 'businessman'
    async getBusinessman(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.stands', 'stands')
            .leftJoinAndSelect('user.suscription', 'suscription')
            .where('user.roles @> :role', { role: ['businessman'] })
            .take(limit)
            .skip(offset)
            .getMany();
    }

    // Buscar usuarios que tengan el rol 'user'
    async getUser(paginationDto: PaginationDto) {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.stands', 'stands')
            .leftJoinAndSelect('user.suscription', 'suscription')
            .where('user.roles @> :role', { role: ['user'] })
            .getMany();
    }

    // Desactivar un usuario
    async desactivateUser(id: string) {
        try {
            await this.userRepository.update(id, { status: false });
            return { message: 'Usuario desactivado' };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    // Activar un usuario
    async activateUser(id: string) {
        try {
            await this.userRepository.update(id, { status: true });
            return { message: 'Usuario activado' };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    private handleDBErrors(error: any): never {


        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        console.log(error)

        throw new InternalServerErrorException('Please check server logs');

    }
}
