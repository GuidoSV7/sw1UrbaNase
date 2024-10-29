import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSuscriptionDto {
    // Title
    @ApiProperty({
        description: 'Title of the suscription',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    title: string;

    //Mount
    @ApiProperty({
        description: 'Mount of the suscription',
        nullable: false,
    })
    @IsNumber()
    mount: number;

    //Date
    @ApiProperty({
        description: 'Date of the suscription',
        nullable: false,
    })
    @IsString()
    date: string;

    //IdUser
    @ApiProperty({
        description: 'Id of the user',
        nullable: true,
    })
    @IsString()
    @IsOptional()
    idUser: string;

    //IdMall
    @ApiProperty({
        description: 'Id of the mall',
        nullable: false,
    })
    @IsNumber()
    idMall: number;

}
