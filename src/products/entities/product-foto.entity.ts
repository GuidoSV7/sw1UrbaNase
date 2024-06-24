import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity({name: 'products_fotos'})
export class ProductFoto{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => Product,
        (product) => product.fotos,
        {onDelete: 'CASCADE'}
    ) @JoinColumn({ name: 'idProduct' })
    product:Product


}