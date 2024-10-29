import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUrl, IsDecimal } from 'class-validator';

export class CreateMallDto {
    @ApiProperty({ example: 'Mall Name', description: 'The name of the mall.' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Mall Owner', description: 'The owner of the mall.' })
    @IsNotEmpty()
    @IsString()
    owner: string;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The image URL of the mall.' })
    @IsNotEmpty()
    @IsUrl()
    image: string;

    @ApiProperty({ example: '123 Main St', description: 'The direction of the mall.' })
    @IsNotEmpty()
    @IsString()
    direction: string;

    @ApiProperty({ example: 123.456789, description: 'The longitude of the mall.' })
    @IsNotEmpty()
    @IsDecimal()
    longitude: number;

    @ApiProperty({ example: 123.456789, description: 'The latitude of the mall.' })
    @IsNotEmpty()
    @IsDecimal()
    latitude: number;

    @ApiProperty({ example: 1, description: 'The NR of the mall.' })
    @IsNotEmpty()
    @IsNumber()
    nr: number;

    @ApiProperty({ example: '123-456-7890', description: 'The phone number of the mall.' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ example: 1, description: 'The ID of the type.' })
    @IsNotEmpty()
    @IsNumber()
    typeId: number;

    @ApiProperty({ example: 1, description: 'The ID of the user.' })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}