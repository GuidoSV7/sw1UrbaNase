import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateStandDto } from './dto/create-stand.dto';
import { UpdateStandDto } from './dto/update-stand.dto';
import { Stand } from './entities/stand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class StandsService {
    private readonly logger = new Logger('StandsService');

    constructor(
        @InjectRepository(Stand)
        private readonly standRepository: Repository<Stand>,

        @InjectRepository(User)
        private readonly dataSource: Repository<User>,
    ) { }

    async create(createStandDto: CreateStandDto) {
        try {
            const stand = this.standRepository.create(createStandDto);
            return await this.standRepository.save(stand);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.standRepository.find({
            take: limit,
            skip: offset,
        });
    }

    async findOne(id: number) {
        const stand = await this.standRepository.findOne({ where: { id } });
        if (!stand) {
            throw new NotFoundException(`Stand #${id} not found`);
        }
        return stand;
    }

    async update(id: number, updateStandDto: UpdateStandDto) {
        const stand = await this.standRepository.preload({
            id,
            ...updateStandDto,
        });
        if (!stand) {
            throw new NotFoundException(`Stand #${id} not found`);
        }
        return this.standRepository.save(stand);
    }

    async remove(id: number) {
        const stand = await this.standRepository.findOne({ where: { id } });
        if (!stand) {
            throw new NotFoundException(`Stand #${id} not found`);
        }
        return this.standRepository.remove(stand);
    }

    //get stands by user
    async findByUser(idUser: string) {
        const User = await this.dataSource.findOne({ where: { id: idUser } });
        return this.standRepository.findOne({
            where: { idUser: User },
        });
    }
}
