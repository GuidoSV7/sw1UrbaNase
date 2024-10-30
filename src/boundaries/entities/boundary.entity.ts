import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mall } from '../../malls/entities/mall.entity';

@Entity('boundaries')
export class Boundary {
    @ApiProperty({ example: 1, description: 'The ID of the Boundary.' })
    @PrimaryGeneratedColumn()
    id: number;

    //latitude
    @ApiProperty({ example: 1.234, description: 'The latitude of the Boundary.' })
    @Column('double precision', { nullable: false })
    latitude: number;

    //longitude
    @ApiProperty({ example: 1.234, description: 'The longitude of the Boundary.' })
    @Column('double precision', { nullable: false })
    longitude: number;

    //Many to one relationship with mall
    @ApiProperty({
        type: () => Mall,
        description: 'The mall this Boundary belongs to'
    })
    @ManyToOne(() => Mall, (mall) => mall.boundary, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'idMall' })
    idMall: Mall;
}
