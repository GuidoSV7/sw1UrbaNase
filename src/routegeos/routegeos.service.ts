import { Injectable } from '@nestjs/common';
import { CreateRoutegeoDto } from './dto/create-routegeo.dto';
import { UpdateRoutegeoDto } from './dto/update-routegeo.dto';

@Injectable()
export class RoutegeosService {
  create(createRoutegeoDto: CreateRoutegeoDto) {
    return 'This action adds a new routegeo';
  }

  findAll() {
    return `This action returns all routegeos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routegeo`;
  }

  update(id: number, updateRoutegeoDto: UpdateRoutegeoDto) {
    return `This action updates a #${id} routegeo`;
  }

  remove(id: number) {
    return `This action removes a #${id} routegeo`;
  }
}
