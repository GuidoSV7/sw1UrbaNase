import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mall } from '../../malls/entities/mall.entity';

@Entity('kmls')
export class Kml {
    @ApiProperty({ example: 1, description: 'The ID of the KML.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'http://example.com/kml.kml', description: 'The URL of the KML.' })
    @Column('text', { nullable: true })
    url: string;

    @ApiProperty({
        type: () => Mall,
        description: 'The mall this KML belongs to'
    })
    @OneToOne(() => Mall, (mall) => mall.kml, {
        onDelete: 'SET NULL',
        eager: true
    })
    @JoinColumn({ name: 'idMall' })
    idMall: Mall;
}
