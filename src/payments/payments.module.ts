import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from 'src/suscriptions/entities/suscription.entity';
import { SuscriptionsModule } from 'src/suscriptions/suscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscription]),
    forwardRef(() => SuscriptionsModule),  // 👈 Usa forwardRef aquí
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule { }
