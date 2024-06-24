import { ApiProperty } from "@nestjs/swagger";
import { Infraestructure } from "src/infraestructures/entities/infraestructure.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('routegeos')
export class Routegeo {
    @ApiProperty({
        example: '1',
        description: 'Id del RouteGeo',
        uniqueItems: true,

    })
    @PrimaryGeneratedColumn()
    id: number;

    

    @ApiProperty({
        example: -63.137352,
        description: 'Longitud del RouteGeo',
        nullable: false,

    })
    @Column('text',{
          nullable: true,    
    })
    longitude: number;
    

    @ApiProperty({
        example: -17.796113,
        description: 'Latitud del RouteGeo',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    latitude: number;

    @ApiProperty({
        example: 2,
        description: 'Numero del Stand',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    nrStand: number;

    @ApiProperty({
        example: 'A',
        description: 'Nombre de la Entrada',
        nullable: false,

    })
    @Column('text',{
        nullable: true,    
    })
    nameEntrance: string;
    //Infraestructute
    @ManyToOne(() => Infraestructure,  { })
    @JoinColumn({ name: 'idInfraestructure' })
    idInfraestructure?: Infraestructure; 

}
