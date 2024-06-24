import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nombre de la Categoria',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    name: string;
}
