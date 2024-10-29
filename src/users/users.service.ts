import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../auth/entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // Buscar usuarios que tengan el rol 'businessman'
    async getBusinessman() {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('user.roles @> :role', { role: ['businessman'] })
            .getMany();
    }

    // Buscar usuarios que tengan el rol 'user'
    async getUser() {
        return await this.userRepository
            .createQueryBuilder('user')
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
