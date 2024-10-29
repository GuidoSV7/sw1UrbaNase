import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Stand } from './entities/stand.entity';
import { StandsService } from './stands.service';
import { StandsController } from './stands.controller';
import { TypesModule } from 'src/types/types.module';


@Module({
    controllers: [StandsController],
    providers: [StandsService],
    imports: [
        TypeOrmModule.forFeature([Stand]),
        TypesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [StandsService, TypeOrmModule],
})
export class StandsModule { }
