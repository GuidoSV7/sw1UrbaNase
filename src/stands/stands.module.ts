import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stand } from './entities/stand.entity';
import { StandsService } from './stands.service';
import { StandsController } from './stands.controller';
import { TypesModule } from 'src/types/types.module';

@Module({
    controllers: [StandsController],
    providers: [StandsService],
    imports: [
        TypeOrmModule.forFeature([Stand]),
        TypesModule
    ],
    exports: [StandsService, TypeOrmModule],
})
export class StandsModule { }
