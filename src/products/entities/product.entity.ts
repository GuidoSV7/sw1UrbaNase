import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductFoto } from "./product-foto.entity";
import { Infraestructure } from "src/infraestructures/entities/infraestructure.entity";
import { Category } from "src/categories/entities/category.entity";


@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '1',
        description: 'Id del Producto',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Coca Cola',
        description: 'Nombre del Producto',

    })
    @Column('text',{
        nullable:false    
    })
    name: string;
    
    @ApiProperty({
        example: 'Bebida Gaseosa',
        description: 'Descripcion del Producto',

    })
    @Column('text',{
        nullable:false    
    })
    description: string;


    @ApiProperty({
        example: 12.50,
        description: 'Precio del Producto',

    })
    @Column('text',{
        nullable:false    
    })
    price: number;

    @ApiProperty({
        example: '["Bebida","Gaseosa"]',
        description: 'Tags del Producto',

    })
    @Column('text',{
        nullable:false    
    })
    tags: string[];

    @ApiProperty({
        example: ' ["https://www.google.com/imagen1.jpg","https://www.google.com/imagen2.jpg"]',
        description: ' Url de las imagenes del Producto',
        nullable: true,

    })
    //Fotos
    @OneToMany(
        ()=> ProductFoto,
        (ProductFoto) => ProductFoto.product,
        {cascade: true, eager:true}
    )
    fotos?: ProductFoto[];


    //Infraestructure
    @ManyToOne(() => Infraestructure,  { })
    @JoinColumn({ name: 'idInfraestructure' })
    idInfraestructure?: Infraestructure


    //Categorias
    @ManyToOne(() => Category,  { onDelete: 'SET NULL' , eager: true , nullable: true, cascade:true})
    @JoinColumn({ name: 'idCategory' })
    idCategory: Category; 

}
