import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KmlsService } from './kmls.service';
import { KmlsController } from './kmls.controller';
import { Kml } from './entities/kml.entity';
import { MallsModule } from 'src/malls/malls.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kml]), MallsModule], // Asegura que MallsModule esté aquí
  controllers: [KmlsController],
  providers: [KmlsService],
  exports: [KmlsService]
})
export class KmlsModule {}
