import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoriesService');
  

  constructor(

   

    @InjectRepository(Category)
    private readonly turnoRepository: Repository<Category>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const {...CategoryDetails} = createCategoryDto;
      const turno = this.turnoRepository.create({
        ...CategoryDetails
      });

      return await this.turnoRepository.save(turno);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.turnoRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let turno: Category;

      const queryBuilder = this.turnoRepository.createQueryBuilder();
      turno = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!turno){
      throw new NotFoundException( `Category con id ${id} no encontrada`);
    }

    return turno;
    
  }



  async remove(id: number) {

    const turno = await this.findOne(id);

    await this.turnoRepository.remove(turno);

    return { mensaje: `La turno con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllCategories(){
    const query = this.turnoRepository.createQueryBuilder('turno');

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
