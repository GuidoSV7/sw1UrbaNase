import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBoundaryDto {
    @ApiProperty({ example: 123.456789, description: 'The latitude of the boundary.' })
    @IsNotEmpty()
    latitude: number;

    @ApiProperty({ example: 123.456789, description: 'The longitude of the boundary.' })
    @IsNotEmpty()
    longitude: number;

    @ApiProperty({ example: 1, description: 'The ID of the mall.' })
    @IsNotEmpty()
    @IsNumber()
    idMall: number;
}