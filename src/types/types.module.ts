import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Type } from './entities/type.entity';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [TypeOrmModule.forFeature([Type, Infraestructure ])],
  exports: [TypesService, TypeOrmModule]
})
export class TypesModule {}
