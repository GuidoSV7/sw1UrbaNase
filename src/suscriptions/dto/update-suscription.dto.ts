import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSuscriptionDto } from './create-suscription.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSuscriptionDto extends PartialType(CreateSuscriptionDto) {
    @ApiProperty({
        description: 'Id of the user',
        nullable: true,
    })
    @IsString()
    @IsOptional()
    idUser: string;
}
