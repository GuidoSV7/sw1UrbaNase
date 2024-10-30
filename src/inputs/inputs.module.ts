import { Module } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { InputsController } from './inputs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Input } from './entities/input.entity';
import { Mall } from 'src/malls/entities/mall.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Input, Mall])],
    controllers: [InputsController],
    providers: [InputsService],
    exports: [InputsService]
})
export class InputsModule { }
