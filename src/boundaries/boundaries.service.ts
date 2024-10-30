import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBoundaryDto } from './dto/create-boundary.dto';
import { UpdateBoundaryDto } from './dto/update-boundary.dto';
import { Boundary } from './entities/boundary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Mall } from 'src/malls/entities/mall.entity';

@Injectable()
export class BoundariesService {

    private readonly logger = new Logger('BoundariesService');

    constructor(
        @InjectRepository(Boundary)
        private readonly boundaryRepository: Repository<Boundary>,

        @InjectRepository(Mall)
        private readonly mallRepository: Repository<Mall>,
    ) { }

    async create(createBoundaryDto: CreateBoundaryDto) {
        try {
            const { idMall, ...boundaryDetails } = createBoundaryDto;
            const mall = await this.mallRepository.findOne({
                where: { id: idMall }
            });
            const boundary = this.boundaryRepository.create({
                ...boundaryDetails,
                idMall: mall
            });
            return await this.boundaryRepository.save(boundary);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.boundaryRepository.find({
            take: limit,
            skip: offset,
        });
    }

    async findOne(id: number) {
        const boundary = await this.boundaryRepository.findOne({ where: { id } });
        if (!boundary) {
            throw new NotFoundException(`Boundary #${id} not found`);
        }
        return boundary;
    }

    //get boundaries by mall
    async findByMall(idMall: number) {
        const  mall = await this.mallRepository.findOne({
            where: { id: idMall }
        });
        if (!mall) {
            throw new NotFoundException(`Mall #${idMall} not found`);
        }
        return this.boundaryRepository.find({
            where: { idMall: mall }
        });
    }

    async update(id: number, updateBoundaryDto: UpdateBoundaryDto) {
        try {
            const mall = await this.mallRepository.findOne({ where: { id: updateBoundaryDto.idMall } });

            const boundary = await this.boundaryRepository.preload({
                id,
                ...updateBoundaryDto,
                idMall: mall,
            });

            if (!boundary) {
                throw new NotFoundException(`Boundary #${id} not found`);
            }

            return await this.boundaryRepository.save(boundary);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async remove(id: number) {
        try {
            const boundary = await this.boundaryRepository.findOne({ where: { id } });

            if (!boundary) {
                throw new NotFoundException(`Boundary #${id} not found`);
            }

            return await this.boundaryRepository.remove(boundary);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }
}
