import { ApiProperty } from "@nestjs/swagger";
import { Infraestructure } from "src/infraestructures/entities/infraestructure.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pointgeos')
export class Pointgeo {
    @ApiProperty({
        example: '1',
        description: 'Id del PointGeo',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    

    @ApiProperty({
        example: -63.137352,
        description: 'Longitud del PointGeo',
        nullable: false,

    })
    @Column('text',{
          nullable: true,    
    })
    longitude: number;
    

    @ApiProperty({
        example: -17.796113,
        description: 'Latitud del PointGeo',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    latitude: number;

    @ApiProperty({
        example: 2,
        description: 'Orden del PointGeo',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    order: number;

    //Infraestructute
    @ManyToOne(() => Infraestructure,  { })
    @JoinColumn({ name: 'idInfraestructure' })
    idInfraestructure?: Infraestructure; 


}
