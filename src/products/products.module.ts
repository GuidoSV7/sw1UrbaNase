import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductFoto } from './entities/product-foto.entity';
import { Infraestructure } from 'src/infraestructures/entities/infraestructure.entity';
import { InfraestructuresModule } from 'src/infraestructures/infraestructures.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductFoto, Infraestructure]),
  AuthModule,
  InfraestructuresModule
  ],

  exports: [ProductsService,TypeOrmModule]
})
export class ProductsModule {}
