import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateInfraestructureDto {
  @ApiProperty({
    description: 'The name of the infrastructure.',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @ApiProperty({ description: 'The owner of the infrastructure.' })
  owner: string;

  @IsString()
  @ApiProperty({ description: 'The image URL of the infrastructure.' })
  image: string;

  @IsString()
  @ApiProperty({ description: 'The direction of the infrastructure.' })
  direction: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The longitude of the infrastructure.' })
  longitude?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The latitude of the infrastructure.' })
  latitude?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The NR of the infrastructure.' })
  nr?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The phone number of the infrastructure.' })
  phone?: string;

  @IsNumber()
  @ApiProperty({ description: 'The ID type of the infrastructure.' })
  idType: number;

  @IsString()

  @ApiProperty({ description: 'The user ID associated with the infrastructure.' })
  idUser: string;
}