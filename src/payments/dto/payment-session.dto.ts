import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsNumber, IsOptional, IsPositive, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PaymentSessiontDto {

    @ApiProperty({ example: '123456789', description: 'The order ID.' })
    @IsString()
    @IsOptional()
    orderId?: string;

    @ApiProperty({ example: '123456789', description: 'The user ID.' })
    @ValidateIf((o) => o.typePayment === 'Subscription')
    @IsString()
    idUser?: string;

    @ApiProperty({ example: 'Ticket', description: 'The type of payment.' })
    @IsIn(['Ticket', 'Subscription'], {
        message: 'typePayment must be either Ticket or Subscription',
      })
    typePayment: string;


    /* @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(()=>PaymentSessionItemDto)
    items:PaymentSessionItemDto[]; */
}

export class PaymentSessionItemDto{
    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}
