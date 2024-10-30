
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Routegeo } from 'src/routegeos/entities/routegeo.entity';
import { Type } from 'src/types/entities/type.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'infraestructures' })
export class Infraestructure {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Infrastructure 1', description: 'The name of the infrastructure.' })
    @Column('text', { nullable: true })
    name: string;

    @ApiProperty({ example: 'Owner 1', description: 'The owner of the infrastructure.' })
    @Column('text', { nullable: true })
    owner: string;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The image URL of the infrastructure.' })
    @Column('text', { nullable: true })
    image: string;


    @ApiProperty({ example: '123 Main St', description: 'The direction of the infrastructure.' })
    @Column('text', { nullable: true })
    direction: string;

    @ApiProperty({ example: 123.456789, description: 'The longitude of the infrastructure.' })
    @Column('decimal', { nullable: true })
    longitude: number;


    @ApiProperty({ example: 123.456789, description: 'The latitude of the infrastructure.' })
    @Column('decimal', { nullable: true })
    latitude: number;

    @ApiProperty({ example: 1, description: 'The NR of the infrastructure.' })
    @Column('int', { nullable: true })
    nr: number;

    @ApiProperty({ example: '123-456-7890', description: 'The phone number of the infrastructure.' })
    @Column('text', { nullable: true })
    phone: string;

    @ApiProperty({ example: 1, description: 'The ID type of the infrastructure.' })
    @ManyToOne(() => Type, { onDelete: 'SET NULL', eager: true })
    @JoinColumn({ name: 'idType' }) // This line is optional. It specifies the column name in the database.
    idType: Type;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' }
        }
    })
    @OneToOne(() => User, { onDelete: 'SET NULL', eager: true }) // Asume que User tiene una propiedad 'infrastructures' que referencia a Infrastructure
    @JoinColumn({ name: 'userId' }) // Especifica el nombre de la columna de clave foránea
    idUser: User;

    //Fotos
    @OneToMany(
        () => Product,
        (product) => product.idInfraestructure,
        { cascade: true, eager: true }
    )
    products?: Product[];


    //RouteGeo
    @OneToMany(
        () => Routegeo,
        (routegeo) => routegeo.idInfraestructure,
        { cascade: true, eager: true }
    )
    routeGeos?: Routegeo[];
}