import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DataSource, Repository } from 'typeorm';
import { ProductFoto } from './entities/product-foto.entity';
import { InfraestructuresService } from 'src/infraestructures/infraestructures.service';


const vision = require('@google-cloud/vision');
@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');



  constructor(



    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,

    @InjectRepository(ProductFoto)
    private readonly prodcutFotoRepository: Repository<ProductFoto>,

    private readonly infraestructureService: InfraestructuresService,
    private readonly dataSource: DataSource,
  ) { }


  async create(createProductDto: CreateProductDto) {
    try {
      const { fotos = [], ...ProductDetails } = createProductDto;

      // Detect labels for each photo
      const allTags = [];
      // Only detect labels if photos were sent
      if (fotos.length > 0) {
        for (const foto of fotos) {
          const labels = await this.detectLabels(foto);
          allTags.push(...labels);
        }
      }

      // Remove duplicates
      const uniqueTags = [...new Set(allTags)];


      const Product = this.ProductRepository.create({
        ...ProductDetails,
        fotos: fotos.map(foto => this.prodcutFotoRepository.create({ url: foto })),
        tags: uniqueTags,
        idInfraestructure: { id: ProductDetails.idInfraestructure },
        idCategory: { id: ProductDetails.idCategory },
      });

      return await this.ProductRepository.save(Product);

    } catch (error) {

      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.ProductRepository.find({
      take: limit,
      skip: offset,
      relations: {
        fotos: true,

      }
    });

  }

  async findOne(id: number) {

    let Product: Product;

    const queryBuilder = this.ProductRepository.createQueryBuilder();
    Product = await queryBuilder
      .where('id =:id ', {
        id: id,
      })
      .getOne();

    if (!Product) {
      throw new NotFoundException(`Product con id ${id} no encontrada`);
    }

    return Product;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { fotos, idInfraestructure, idCategory, ...toUpdate } = updateProductDto;

    const Product = await this.ProductRepository.preload({ id, ...toUpdate });

    if (!Product) {
      throw new NotFoundException(`Product con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {

      if (idInfraestructure) {
        Product.idInfraestructure = await this.infraestructureService.findOne(idInfraestructure);
      }

      await queryRunner.manager.save(Product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // await this.ProductRepository.save(Product);
      return this.findOne(id);

    } catch {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Product');
    }
  }


  async remove(id: number) {

    const Product = await this.findOne(id);

    await this.ProductRepository.remove(Product);

    return { mensaje: `La Product con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllProducts() {
    const query = this.ProductRepository.createQueryBuilder('Product');

    try {
      return await query
        .delete()
        .where({})
        .execute();



    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }
  }
  visionClient = new vision.ImageAnnotatorClient();
  async detectLabels(imageUrl: string) {

    const [result] = await this.visionClient.labelDetection(imageUrl);
    const labels = result.labelAnnotations;

    // Devolver las etiquetas detectadas
    return labels.map(label => label.description);
  }

  async searchProducts(imageUrl: string) {

    const imageLabels = await this.detectLabels(imageUrl);


    // Find products with at least one matching label
    const products = await this.ProductRepository.createQueryBuilder('product')
      .where(
        new Brackets(qb => {
          imageLabels.forEach((tag, i) => {
            const paramName = `tag${i}`;
            qb.orWhere(`product.tags LIKE :${paramName}`, { [paramName]: `%${tag}%` });
          });
        })
      )
      .getMany();

    return products;
  }


}
