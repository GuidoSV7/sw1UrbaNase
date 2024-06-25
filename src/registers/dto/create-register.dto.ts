import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRegisterDto {
    @IsNumber()
    idInfraestructure: number;

    @IsString()
    idUser: string;
}
