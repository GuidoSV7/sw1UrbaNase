import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUrl, IsDecimal } from 'class-validator';

export class CreateStandDto {
    @ApiProperty({ example: 'Stand Name', description: 'The name of the stand.' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Stand Owner', description: 'The owner of the stand.' })
    @IsNotEmpty()
    @IsString()
    owner: string;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The image URL of the stand.' })
    @IsNotEmpty()
    @IsUrl()
    image: string;

    @ApiProperty({ example: '123 Main St', description: 'The direction of the stand.' })
    @IsNotEmpty()
    @IsString()
    direction: string;

    @ApiProperty({ example: 123.456789, description: 'The longitude of the stand.' })
    @IsNotEmpty()
    @IsDecimal()
    longitude: number;

    @ApiProperty({ example: 123.456789, description: 'The latitude of the stand.' })
    @IsNotEmpty()
    @IsDecimal()
    latitude: number;

    @ApiProperty({ example: 1, description: 'The NR of the stand.' })
    @IsNotEmpty()
    @IsNumber()
    nr: number;

    @ApiProperty({ example: '123-456-7890', description: 'The phone number of the stand.' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ example: 'A-123', description: 'The number/identifier of the stand.' })
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty({ example: 1, description: 'The ID of the mall.' })
    @IsNotEmpty()
    @IsNumber()
    mallId: number;

    @ApiProperty({ example: 1, description: 'The ID of the type.' })
    @IsNotEmpty()
    @IsNumber()
    typeId: number;

    @ApiProperty({ example: 1, description: 'The ID of the user.' })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}