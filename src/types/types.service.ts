import { Injectable, Logger, NotFoundException  } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TypesService {
  private readonly logger = new Logger('TypesService');

  constructor(

   

    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createTypeDto: CreateTypeDto) {
    try {
      const {...TypeDetails} = createTypeDto;
      const type = this.typeRepository.create({
        ...TypeDetails,
       
      });

      return await this.typeRepository.save(type);
      
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

    let type: Type;

      const queryBuilder = this.typeRepository.createQueryBuilder();
      type = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!type){
      throw new NotFoundException( `Type con id ${id} no encontrada`);
    }

    return type;
    
  }

  async remove(id: number) {

    const type = await this.findOne(id);

    await this.typeRepository.remove(type);

    return { mensaje: `La type con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllTypes(){
    const query = this.typeRepository.createQueryBuilder('type');

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
