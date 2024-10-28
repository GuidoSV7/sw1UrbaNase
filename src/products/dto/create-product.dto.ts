import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Nombre del Producto',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        description: 'Descripcion del Producto',
        nullable: false,

    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Precio del Producto',
        nullable: false,

    })
    @IsNumber()
    @IsOptional()
    price: number;


    @ApiProperty({
        description: 'Tags del Producto',
        nullable: false,

    })
    /* @IsString() */
    @IsOptional()
    tags: string[];
    
    @ApiProperty({
        description: ' Fotos del Producto',
        nullable: true,

    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    fotos?: string[];

    @ApiProperty({
        description: 'Id de la Infraestructura',
        nullable: false,

    })

    @IsNumber()
    idInfraestructure: number;

    @IsNumber()
    idCategory: number;

}
