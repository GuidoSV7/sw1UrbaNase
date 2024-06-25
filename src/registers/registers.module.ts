import { Module } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { RegistersController } from './registers.controller';
import { Register } from './entities/register.entity';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { User } from 'src/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RegistersController],
  providers: [RegistersService],
  imports: [TypeOrmModule.forFeature([Register, Infraestructure, User ])],
})
export class RegistersModule {}
