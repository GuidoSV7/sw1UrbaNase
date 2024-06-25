import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RegistersService {
  private readonly logger = new Logger('RegistersService');
  

  constructor(

   

    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    
    
    private readonly dataSource: DataSource,
  ){}


  async create(createRegisterDto: CreateRegisterDto) {
    try {
      const {idInfraestructure,idUser,...RegisterDetails} = createRegisterDto;
      const register = this.registerRepository.create({
        ...RegisterDetails,
        idInfraestructure: { id: idInfraestructure},
       idUser: { id: idUser}
      });

      return await this.registerRepository.save(register);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  async findAllByUserId(iduser: string): Promise<Register[]> {
    const registers = await this.registerRepository.createQueryBuilder('registers')
      .select(['registers.id', 'registers.idInfraestructure']) // Asegúrate de seleccionar explícitamente los campos que necesitas
      .where('registers.idUser = :id', { id: iduser })
      .leftJoinAndSelect("registers.idInfraestructure", "Infraestructure")
      .getMany();

    return registers;
}

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.registerRepository.find({
      take: limit,
      skip: offset
    });
    
  }

  async findOne(id : number) {

    let register: Register;

      const queryBuilder = this.registerRepository.createQueryBuilder();
      register = await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!register){
      throw new NotFoundException( `Register con id ${id} no encontrada`);
    }

    return register;
    
  }

  
  async remove(id: number) {

    const register = await this.findOne(id);

    await this.registerRepository.remove(register);

    return { mensaje: `La register con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllRegisters(){
    const query = this.registerRepository.createQueryBuilder('register');

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
