import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTypeDto {
    @ApiProperty({
        description: 'Nombre del Tipo de Infraestructura.',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    name: string;
}
