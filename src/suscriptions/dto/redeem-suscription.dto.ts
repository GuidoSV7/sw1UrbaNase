import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class RedeemSuscriptionDto {
    // code
    @ApiProperty({
        description: 'Code of the redeem',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    code: string;

    //IdUser
    @ApiProperty({
        description: 'Id of the user',
        nullable: false,
    })
    @IsString()
    idUser: string;
}