import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class CreateRoutegeoDto {
    @ApiProperty({
        example: -63.137352,
        description: 'Longitud del RouteGeo',
        nullable: false,

    })

    longitude: number;
    

    @ApiProperty({
        example: -17.796113,
        description: 'Latitud del RouteGeo',
        nullable: false,

    })

    latitude: number;

    @ApiProperty({
        example: 35,
        description: 'Numero del Stand',
        nullable: false,

    })
    nrStand: number;

    @ApiProperty({
        example: 35,
        description: 'Numero del Stand',
        nullable: false,

    })
    nameEntrance: number;


}
