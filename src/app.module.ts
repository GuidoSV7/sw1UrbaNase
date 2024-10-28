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
import { PointgeosModule } from './pointgeos/pointgeos.module';
import { RoutegeosModule } from './routegeos/routegeos.module';
import { RegistersModule } from './registers/registers.module';
/* import { SuscriptionsController } from './suscriptions/suscriptions.controller';
import { SuscriptionsService } from './suscriptions/suscriptions.service';
import { SuscriptionsModule } from './suscriptions/suscriptions.module'; */
import { SuscriptionsModule } from './suscriptions/suscriptions.module';



@Module({
  imports: [


    CloudinaryModule,
    
    ConfigModule.forRoot({isGlobal:true}),

    

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


    PointgeosModule,


    RoutegeosModule,


    RegistersModule,


    SuscriptionsModule,



  ],
  controllers: [],
  providers: [CloudinaryService],
})
export class AppModule {}
