// suscriptions.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StandsModule } from 'src/stands/stands.module';
import { MallsModule } from 'src/malls/malls.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscription]),
    AuthModule,
    forwardRef(() => StandsModule),
    forwardRef(() => MallsModule),
    forwardRef(() => PaymentsModule)
  ],
  controllers: [SuscriptionsController],
  providers: [SuscriptionsService],
  exports: [SuscriptionsService, TypeOrmModule],
})
export class SuscriptionsModule { }
