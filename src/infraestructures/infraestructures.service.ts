import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateInfraestructureDto } from './dto/create-infraestructure.dto';
import { UpdateInfraestructureDto } from './dto/update-infraestructure.dto';
import { Infraestructure } from './entities/infraestructure.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypesService } from 'src/types/types.service';
@Injectable()
export class InfraestructuresService {

  private readonly logger = new Logger('UnidadesEducativasService');

  constructor(
    @InjectRepository(Infraestructure)
    private readonly infraestructureRepository: Repository<Infraestructure>,

    private readonly typeService: TypesService,

    private readonly dataSource: DataSource,
  ) { }


  async create(createInfraestructureDto: CreateInfraestructureDto) {

    try {

      const { idType, idUser, ...infraestructureDetails } = createInfraestructureDto;

      const infraestructure = this.infraestructureRepository.create({
        ...infraestructureDetails,
        idType: { id: idType },
        idUser: { id: idUser },
      });
      console.log("🚀 ~ InfraestructuresService ~ create ~ infraestructure:", infraestructure)

      return await this.infraestructureRepository.save(infraestructure);

    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }

  }

  findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.infraestructureRepository.find({
      take: limit,
      skip: offset,
      relations: {

      }
    });

  }

  async findOne(id: number) {

    let infraestructure: Infraestructure;

    const queryBuilder = this.infraestructureRepository.createQueryBuilder("infraestructure");
    infraestructure = await queryBuilder

      .where('infraestructure.id =:id', {
        id: id,
      })

      .leftJoinAndSelect("infraestructure.idType", "Type")
      .leftJoinAndSelect("infraestructure.idUser", "User")
      .getOne();

    if (!infraestructure) {
      throw new NotFoundException(`Infraestructura con id ${id} no encontrada`);
    }

    return infraestructure;

  }

  async update(id: number, updateInfraestructureDto: UpdateInfraestructureDto) {

    const { idType, idUser, ...toUpdate } = updateInfraestructureDto;


    const infraestructure = await this.infraestructureRepository.preload({
      id,
      ...toUpdate,

    });



    if (!infraestructure) {
      throw new NotFoundException(`Infraestructuracon id ${id} no encontrada`);
    }


    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      if (idType) {
        infraestructure.idType = await this.typeService.findOne(idType);
      }

      await queryRunner.manager.save(infraestructure);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);
    } catch {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Infraestructura');
    }
  }

  async findOnePlain(id: number) {
    const { ...rest } = await this.findOne(id);
    return {
      ...rest,

    }
  }


  async remove(id: number) {

    const infraestructure = await this.findOne(id);

    await this.infraestructureRepository.remove(infraestructure);

    return { mensaje: `La Infraestructuracon id ${id} se eliminó exitosamente.` };

  }

  async deleteAllUnidadesEducativas() {
    const query = this.infraestructureRepository.createQueryBuilder('infraestructure');

    try {
      return await query
        .delete()
        .where({})
        .execute();



    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }
  }


}
