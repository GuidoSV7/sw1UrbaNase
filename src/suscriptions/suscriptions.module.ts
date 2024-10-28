import { Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';
import { Type } from 'src/types/entities/type.entity';
import { TypesModule } from 'src/types/types.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
    controllers: [SuscriptionsController],
    providers: [SuscriptionsService],
    imports: [
        TypeOrmModule.forFeature([Suscription, Type, User]),
        TypesModule
    ],
    exports: [SuscriptionsService, TypeOrmModule]
})
export class SuscriptionsModule {}
