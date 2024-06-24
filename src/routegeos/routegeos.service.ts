import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoutegeoDto } from './dto/create-routegeo.dto';
import { UpdateRoutegeoDto } from './dto/update-routegeo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routegeo } from './entities/routegeo.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RoutegeosService {
  private readonly logger = new Logger('RouteGeosService');

  constructor(

   

    @InjectRepository(Routegeo)
    private readonly typeRepository: Repository<Routegeo>,
    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createRouteGeoDto: CreateRoutegeoDto) {
    try {
      const {idInfraestructure,...RouteGeoDetails} = createRouteGeoDto;
      const routegeo = this.typeRepository.create({
        ...RouteGeoDetails,
        idInfraestructure: { id: idInfraestructure},
       
      });

      return await this.typeRepository.save(routegeo);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.typeRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let routegeo: Routegeo;

      const queryBuilder = this.typeRepository.createQueryBuilder();
      routegeo = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!routegeo){
      throw new NotFoundException( `Routegeo con id ${id} no encontrada`);
    }

    return routegeo;
    
  }

  async remove(id: number) {

    const routegeo = await this.findOne(id);

    await this.typeRepository.remove(routegeo);

    return { mensaje: `La routegeo con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllRouteGeos(){
    const query = this.typeRepository.createQueryBuilder('routegeo');

    try{
      return await query
       .delete()
       .where({})
       .execute(); 



    } catch(error){
      this.logger.error(error.message);
      return error.message;
    }
  }

}
