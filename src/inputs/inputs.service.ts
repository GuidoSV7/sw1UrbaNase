import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { Input } from './entities/input.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Mall } from 'src/malls/entities/mall.entity';

@Injectable()
export class InputsService {

    private readonly logger = new Logger('InputsService');

    constructor(
        @InjectRepository(Input)
        private readonly inputRepository: Repository<Input>,

        @InjectRepository(Mall)
        private readonly mallRepository: Repository<Mall>,
    ) { }

    async create(createInputDto: CreateInputDto) {
        try {
            const { idMall, ...inputDetails } = createInputDto;
            const mall = await this.mallRepository.findOne({
                where: { id: idMall }
            });
            const input = this.inputRepository.create({
                ...inputDetails,
                idMall: mall
            });
            return await this.inputRepository.save(input);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.inputRepository.find({
            take: limit,
            skip: offset,
        });
    }

    async findOne(id: number) {
        const input = await this.inputRepository.findOne({ where: { id } });
        if (!input) {
            throw new NotFoundException(`Input #${id} not found`);
        }
        return input;
    }

    //get inputs by mall
    async findByMall(idMall: number) {
        const mall = await this.mallRepository.findOne({
            where: { id: idMall }
        });
        return this.inputRepository.find({
            where: { idMall: mall }
        });
    }

    async update(id: number, updateInputDto: UpdateInputDto) {
        try {
            const mall = await this.mallRepository.findOne({ where: { id: updateInputDto.idMall } });

            const input = await this.inputRepository.preload({
                id,
                ...updateInputDto,
                idMall: mall,
            });

            if (!input) {
                throw new NotFoundException(`Input #${id} not found`);
            }

            return await this.inputRepository.save(input);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async remove(id: number) {
        try {
            const input = await this.inputRepository.findOne({ where: { id } });

            if (!input) {
                throw new NotFoundException(`Input #${id} not found`);
            }

            return await this.inputRepository.remove(input);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }
}
