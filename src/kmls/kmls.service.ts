import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateKmlDto } from './dto/create-kml.dto';
import { UpdateKmlDto } from './dto/update-kml.dto';
import { Kml } from './entities/kml.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Mall } from 'src/malls/entities/mall.entity';


@Injectable()
export class KmlsService {

    private readonly logger = new Logger('KmlsService');

    constructor(
        @InjectRepository(Kml)
        private readonly kmlRepository: Repository<Kml>,

        @InjectRepository(Mall)
        private readonly mallRepository: Repository<Mall>,
    ) { }

    async create(createKmlDto: CreateKmlDto) {
        try {
            const { idMall, ...kmlDetails } = createKmlDto;
            const mall = await this.mallRepository.findOne({
                where: { id: idMall }
            });
            const kml = this.kmlRepository.create({
                ...kmlDetails,
                idMall: mall
            });
            return await this.kmlRepository.save(kml);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.kmlRepository.find({
            take: limit,
            skip: offset,
        });
    }

    async findOne(id: number) {
        const kml = await this.kmlRepository.findOne({ where: { id } });
        if (!kml) {
            throw new NotFoundException(`Kml #${id} not found`);
        }
        return kml;
    }

    //get kmls by mall
    async findByMall(idMall: number) {
        const  mall = await this.mallRepository.findOne({
            where: { id: idMall }
        });
        return this.kmlRepository.findOne({
            where: { idMall: mall },
            relations: ['idMall']
        });
    }

    async update(id: number, updateKmlDto: UpdateKmlDto) {
        const { idMall, ...kmlDetails } = updateKmlDto;
        const mall = await this.mallRepository.findOne({
            where: { id: idMall }
        });

        const kml = await this.kmlRepository.preload({
            id,
            ...kmlDetails,
            idMall: mall
        });

        if (!kml) {
            throw new NotFoundException(`Kml #${id} not found`);
        }
        return this.kmlRepository.save(kml);
    }

    async remove(id: number) {
        const kml = await this.findOne(id);
        return this.kmlRepository.remove(kml);
    }
}
