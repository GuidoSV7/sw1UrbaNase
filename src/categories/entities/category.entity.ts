import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categories'})
export class Category {

    @ApiProperty({
        example: '1',
        description: 'Id de la Categoria',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Bebidas',
        description: 'Nombre de la Categoria',
        nullable: false,
        minLength: 1,
    })
    @Column('text',{
        unique: true,    
    })
    name: string;

    @OneToMany(() => Product, product => product.idCategory)
    products: Product[];
}
