import { Module } from '@nestjs/common';
import { RoutegeosService } from './routegeos.service';
import { RoutegeosController } from './routegeos.controller';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { Routegeo } from './entities/routegeo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RoutegeosController],
  providers: [RoutegeosService],
  imports: [TypeOrmModule.forFeature([Routegeo, Infraestructure ])],
})
export class RoutegeosModule {}
