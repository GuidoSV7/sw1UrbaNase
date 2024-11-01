import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { InfraestructuresModule } from './infraestructures/infraestructures.module';
import { TypesModule } from './types/types.module';
import { CategoriesModule } from './categories/categories.module';
import { RoutegeosModule } from './routegeos/routegeos.module';
import { RegistersModule } from './registers/registers.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MallsModule } from './malls/malls.module';
import { StandsModule } from './stands/stands.module';
import { KmlsModule } from './kmls/kmls.module';
import { BoundariesModule } from './boundaries/boundaries.module';
import { InputsModule } from './inputs/inputs.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [

    CloudinaryModule,

    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE === 'prod'
          ? { rejectUnauthorized: false }
          : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),


    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    ProductsModule,

    InfraestructuresModule,

    TypesModule,

    CategoriesModule,

    RoutegeosModule,

    RegistersModule,

    SuscriptionsModule,

    UsersModule,

    MallsModule,

    StandsModule,

    KmlsModule,

    BoundariesModule,

    InputsModule,

    PaymentsModule,
  ],
  controllers: [UsersController],
  providers: [CloudinaryService, UsersService],
})
export class AppModule { }
