import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNumber, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';

export class CreateKmlDto {
    @ApiProperty({
        description: 'The name of the KML.',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    url: string;

    @IsNumber()
    @ApiProperty({
        description: 'The ID of the mall this KML belongs to.',
        nullable: false,
    })
    idMall: number;
}