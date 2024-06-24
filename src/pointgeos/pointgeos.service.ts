import { Injectable } from '@nestjs/common';
import { CreatePointgeoDto } from './dto/create-pointgeo.dto';
import { UpdatePointgeoDto } from './dto/update-pointgeo.dto';

@Injectable()
export class PointgeosService {
  create(createPointgeoDto: CreatePointgeoDto) {
    return 'This action adds a new pointgeo';
  }

  findAll() {
    return `This action returns all pointgeos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pointgeo`;
  }

  update(id: number, updatePointgeoDto: UpdatePointgeoDto) {
    return `This action updates a #${id} pointgeo`;
  }

  remove(id: number) {
    return `This action removes a #${id} pointgeo`;
  }
}
