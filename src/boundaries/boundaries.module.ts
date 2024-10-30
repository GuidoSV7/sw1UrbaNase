import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoundariesService } from './boundaries.service';
import { BoundariesController } from './boundaries.controller';
import { Boundary } from './entities/boundary.entity';
import { Mall } from 'src/malls/entities/mall.entity';

@Module({
    controllers: [BoundariesController],
    providers: [BoundariesService],
    imports: [TypeOrmModule.forFeature([Boundary, Mall])],
    exports: [BoundariesService],
})
export class BoundariesModule { }
