import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateRoutegeoDto {
    @ApiProperty({
        example: -63.137352,
        description: 'Longitud del RouteGeo',
        nullable: false,

    })
    @IsNumber()
    longitude: number;
    

    @ApiProperty({
        example: -17.796113,
        description: 'Latitud del RouteGeo',
        nullable: false,

    })
    @IsNumber()
    latitude: number;

    @ApiProperty({
        example: 35,
        description: 'Numero del Stand',
        nullable: false,

    })
    @IsNumber()
    nrStand: number;

    @ApiProperty({
        example: 35,
        description: 'Numero del Stand',
        nullable: false,

    })
    @IsString()
    nameEntrance: string;

    @ApiProperty({
        description: 'Id de la Infraestructura',
        nullable: false,

    })

    @IsNumber()
    idInfraestructure: number;


}
