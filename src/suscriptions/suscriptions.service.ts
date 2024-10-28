import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';
import { Suscription } from './entities/suscription.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class SuscriptionsService {

    private readonly logger = new Logger('SuscriptionsService');

    constructor(
        @InjectRepository(Suscription)
        private readonly suscriptionRepository: Repository<Suscription>,

    ) { }

    async create(createSuscriptionDto: CreateSuscriptionDto) {
        try {
            const { idUser, ...suscriptionDetails } = createSuscriptionDto;
            console.log("🚀 ~ SuscriptionsService ~ create ~ idUser:", idUser)
            const suscription = this.suscriptionRepository.create({
                ...suscriptionDetails,
                idUser: { id: idUser },
            });
            console.log("🚀 ~ SuscriptionsService ~ create ~ suscription:", suscription)

            return await this.suscriptionRepository.save(suscription);
        } catch (error) {
            this.logger.error(error.message);
            return error.message;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;

        return this.suscriptionRepository.find({
            take: limit,
            skip: offset,
            relations: {
                idUser: true, // Cargar la relación con el usuario si es necesaria
            },
        });
    }


    async findOne(id: number) {

        let suscription: Suscription;

        const queryBuilder = this.suscriptionRepository.createQueryBuilder('suscription');
        suscription = await queryBuilder
            .where('id =:id ', {
                id: id,
            })
            .getOne();

        if (!suscription) {
            throw new NotFoundException(`Suscription con id ${id} no encontrada`);
        }

        return suscription;
    }

    async update(id: number, updateSuscriptionDto: UpdateSuscriptionDto) {
        const { idUser, ...toUpdate } = updateSuscriptionDto;

        const suscription = await this.suscriptionRepository.preload({ id, ...toUpdate });

        if (!suscription) {
            throw new NotFoundException(`Suscription con id ${id} no encontrada`);
        }

        try {
            await this.suscriptionRepository.save(suscription);
            return suscription;
        } catch (error) {
            throw new InternalServerErrorException('Error al actualizar la suscripcion');
        }
    }

    async remove(id: number) {
        const suscription = await this.findOne(id);

        if (!suscription) {
            throw new NotFoundException(`Suscription con id ${id} no encontrada`);
        }

        try {
            await this.suscriptionRepository.delete(id);
            return suscription;
        } catch (error) {
            throw new InternalServerErrorException('Error al eliminar la suscripcion');
        }
    }

    // get all suscriptions by user
    async findAllByUser(idUser: string) {
        const suscriptions = await this.suscriptionRepository.find({
            where: {
                idUser: { id: idUser },
            },
        });

        return suscriptions;
    }
}
