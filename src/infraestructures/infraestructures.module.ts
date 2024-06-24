import { Module } from '@nestjs/common';
import { InfraestructuresService } from './infraestructures.service';
import { InfraestructuresController } from './infraestructures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infraestructure } from './entities/infraestructure.entity';
import { Type } from 'src/types/entities/type.entity';
import { TypesModule } from 'src/types/types.module';

@Module({
  controllers: [InfraestructuresController],
  providers: [InfraestructuresService],
  imports: [
    TypeOrmModule.forFeature([Infraestructure, Type]),
    TypesModule


  ],
  exports: [InfraestructuresService,TypeOrmModule]
})
export class InfraestructuresModule {}
