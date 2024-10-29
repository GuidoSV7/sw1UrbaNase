import { forwardRef, Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StandsModule } from 'src/stands/stands.module';
import { MallsModule } from 'src/malls/malls.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Suscription]),
      AuthModule,
      forwardRef(() => StandsModule),
      forwardRef(() => MallsModule)
    ],
    controllers: [SuscriptionsController],
    providers: [SuscriptionsService],
    exports: [SuscriptionsService, TypeOrmModule]
  })
  export class SuscriptionsModule {}
