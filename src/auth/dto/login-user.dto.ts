import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, isString } from "class-validator";

export class LoginUserDto{


    @ApiProperty({
        description: 'Email del Usuario',
        nullable: false
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del Usuario',
        nullable: false
    })
    @IsString()
    @MaxLength(8)
    password: string;


}