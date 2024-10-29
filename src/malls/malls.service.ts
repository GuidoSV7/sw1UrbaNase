import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMallDto } from './dto/create-mall.dto';
import { UpdateMallDto } from './dto/update-mall.dto';
import { Mall } from './entities/mall.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Stand } from 'src/stands/entities/stand.entity';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { User } from 'src/auth/entities/user.entity';
import { Type } from 'src/types/entities/type.entity';


@Injectable()
export class MallsService {

    private readonly logger = new Logger('MallsService');

    constructor(
        @InjectRepository(Mall)
        private readonly mallRepository: Repository<Mall>,

        @InjectRepository(Stand)
        private readonly standRepository: Repository<Stand>,

        @InjectRepository(Infraestructure)
        private readonly infraestructureRepository: Repository<Infraestructure>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,

        private readonly dataSource: DataSource,
    ) { }

    async create(createMallDto: CreateMallDto): Promise<Mall> {
        // Buscar el type y user relacionados
        const type = await this.typeRepository.findOne({
            where: { id: createMallDto.typeId }
        });
        if (!type) throw new NotFoundException(`Type with ID ${createMallDto.typeId} not found`);

        const user = await this.userRepository.findOne({
            where: { id: createMallDto.userId.toString() }
        });
        if (!user) throw new NotFoundException(`User with ID ${createMallDto.userId} not found`);

        // Crear la nueva entidad Mall
        const mall = this.mallRepository.create({
            name: createMallDto.name,
            owner: createMallDto.owner,
            image: createMallDto.image,
            direction: createMallDto.direction,
            longitude: createMallDto.longitude,
            latitude: createMallDto.latitude,
            nr: createMallDto.nr,
            phone: createMallDto.phone,
            idType: type,
            idUser: user,
            stands: [],         // Inicializar arrays vacíos para las relaciones
            suscriptions: [],   // Inicializar arrays vacíos para las relaciones
            products: [],       // Heredado de Infrastructure
            pointGeos: [],      // Heredado de Infrastructure
            routeGeos: [],      // Heredado de Infrastructure
        });

        // Guardar y retornar el mall
        return await this.mallRepository.save(mall);
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.mallRepository.find({
            take: limit,
            skip: offset,
            relations: {
                stands: true,
            },
        });
    }

    async findOne(id: number): Promise<Mall> {
        return this.mallRepository.findOne({
            where: { id },
            relations: {
                stands: true,
                suscriptions: true
            }
        });
    }

    async update(id: number, updateMallDto: UpdateMallDto) {
        try {
            const mall = await this.mallRepository.preload({
                id,
                ...updateMallDto,
            });

            if (!mall) {
                throw new NotFoundException(`Mall #${id} not found`);
            }

            return await this.mallRepository.save(mall);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async remove(id: number) {
        try {
            const mall = await this.mallRepository.findOne({ where: { id } });

            if (!mall) {
                throw new NotFoundException(`Mall #${id} not found`);
            }

            return await this.mallRepository.remove(mall);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }
}
