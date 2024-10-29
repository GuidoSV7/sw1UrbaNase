import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MallsService } from './malls.service';
import { MallsController } from './malls.controller';
import { Mall } from './entities/mall.entity';
import { TypesModule } from 'src/types/types.module';
import { AuthModule } from 'src/auth/auth.module';
import { StandsModule } from 'src/stands/stands.module';
import { InfraestructuresModule } from 'src/infraestructures/infraestructures.module';
import { Stand } from 'src/stands/entities/stand.entity';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { Type } from 'src/types/entities/type.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mall,
      Stand,
      Infraestructure,
      Type,
      User
    ]),
    forwardRef(() => StandsModule),
    forwardRef(() => InfraestructuresModule),
    TypesModule,
    AuthModule
  ],
  providers: [MallsService],
  controllers: [MallsController],
  exports: [MallsService, TypeOrmModule]
})
export class MallsModule { }