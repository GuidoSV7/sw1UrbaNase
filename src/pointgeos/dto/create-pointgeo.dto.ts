import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class CreatePointgeoDto {
    @ApiProperty({
        example: -63.137352,
        description: 'Longitud del PointGeo',
        nullable: false,

    })
    @IsNumber() 
    longitude: number;
    

    @ApiProperty({
        example: -17.796113,
        description: 'Latitud del PointGeo',
        nullable: false,

    })
    @IsNumber()
    latitude: number;

    @ApiProperty({
        example: 2,
        description: 'Orden del PointGeo',
        nullable: false,

    })
    @IsNumber()
    order: number;


}
