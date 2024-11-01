import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';
import { Suscription } from './entities/suscription.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RedeemSuscriptionDto } from './dto/redeem-suscription.dto';
import { User } from './../auth/entities/user.entity';
import { Stand } from 'src/stands/entities/stand.entity';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class SuscriptionsService {

    private readonly logger = new Logger('SuscriptionsService');

    constructor(
        @InjectRepository(Suscription)
        private readonly suscriptionRepository: Repository<Suscription>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Stand)
        private readonly standRepository: Repository<Stand>,

        private readonly paymentsService: PaymentsService,

    ) { }

    generateCode(length = 8): string {
        return uuidv4().replace(/-/g, '').substring(0, length).toUpperCase();
    }

    async create(createSuscriptionDto: CreateSuscriptionDto) {
        try {

            if (createSuscriptionDto.mount === 0) {
                const { ...suscriptionDetails } = createSuscriptionDto;
                const suscription = this.suscriptionRepository.create({
                    ...suscriptionDetails,
                    code: this.generateCode(8),
                    idMall: { id: suscriptionDetails.idMall } as any, // Ensure idMall is correctly typed
                });
                return await this.suscriptionRepository.save(suscription);
            } else {
                const payment = await this.paymentsService.createPaymentSession(createSuscriptionDto);
                return payment;
            }
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

    async update(id: number, updateSuscriptionDto: UpdateSuscriptionDto) {
        const { idUser, ...toUpdate } = updateSuscriptionDto;

        const suscription = await this.suscriptionRepository.preload({
            id,
            ...toUpdate,
            idMall: { id: toUpdate.idMall } as any // Ensure idMall is correctly typed
        });

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

    async findOne(id: number): Promise<Suscription> {
        return this.suscriptionRepository.findOne({
            where: { id },
            relations: {
                idUser: true,
                idMall: true,
            },
        });
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

    // canjea una suscripcion
    async redeem(redeemSuscriptionDto: RedeemSuscriptionDto) {
        try {
            const { code, idUser } = redeemSuscriptionDto;

            // Busca la suscripción solo por el código
            const suscription = await this.suscriptionRepository.findOne({
                where: { code },
            });

            if (!suscription) {
                throw new NotFoundException('No se encontró la suscripción');
            }

            // Verifica si el usuario existe
            const user = await this.userRepository.findOne({
                where: { id: idUser },
            });

            if (!user) {
                throw new NotFoundException('No se encontró el usuario');
            }

            // Asigna el usuario y marca como redimida
            suscription.idUser = user;
            suscription.redeemed = true;

            const stand = await this.standRepository.create({
                idUser: user,
                idMall: suscription.idMall,
                idType: 2 as any,
            });
            await this.standRepository.save(stand);

            // Guarda la suscripción actualizada
            await this.suscriptionRepository.save(suscription);

            return suscription;
        } catch (error) {
            console.log("🚀 ~ SuscriptionsService ~ redeem ~ error:", error);
            throw new InternalServerErrorException('Error al canjear la suscripción');
        }
    }

    // get all suscriptions by mall
    async findAllByMall(idMall: number) {
        const suscriptions = await this.suscriptionRepository.find({
            where: {
                idMall: { id: idMall },
            },
        });

        return suscriptions;
    }

    // get suscripcion title free
    async suscriptionFree() {
        const suscription = await this.suscriptionRepository.find({
            where: {
                title: 'Free',
            },
        });

        return suscription;
    }

    // get suscripcion title monthly
    async suscriptionMonthly() {
        const suscription = await this.suscriptionRepository.find({
            where: {
                title: 'Monthly',
            },
        });

        return suscription;
    }

    // get suscripcion title annual
    async suscriptionAnnual() {
        const suscription = await this.suscriptionRepository.find({
            where: {
                title: 'Annual',
            },
        });

        return suscription;
    }
}
