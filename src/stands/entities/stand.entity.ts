import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mall } from '../../malls/entities/mall.entity';
import { Infraestructure } from '../../infraestructures/entities/infraestructure.entity';

@Entity('stands')
export class Stand extends Infraestructure {
    @ApiProperty({ example: 'A-123', description: 'The number/identifier of the stand.' })
    @Column('text', { nullable: true })
    number: string;

    @ApiProperty({
        type: () => Mall,
        description: 'The mall this stand belongs to'
    })
    @ManyToOne(() => Mall, (mall) => mall.stands, {
        onDelete: 'SET NULL',
        eager: true
    })
    @JoinColumn({ name: 'idMall' })
    idMall: Mall;
}