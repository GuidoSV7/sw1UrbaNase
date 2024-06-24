import { Module } from '@nestjs/common';
import { PointgeosService } from './pointgeos.service';
import { PointgeosController } from './pointgeos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pointgeo } from './entities/pointgeo.entity';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';

@Module({
  controllers: [PointgeosController],
  providers: [PointgeosService],
  imports: [TypeOrmModule.forFeature([Pointgeo, Infraestructure ])],
  exports: [PointgeosService, TypeOrmModule]
})
export class PointgeosModule {}
