import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
// import { PaymentSessiontDto } from './dto/payment-session.dto';
import { CreateSuscriptionDto } from 'src/suscriptions/dto/create-suscription.dto';
import { Request, Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // @Post('create-payment-session')
  // @ApiResponse({ status: 201, description: 'Payment Session Creado exitosamente' })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  // createPaymentSession(@Body() paymentSessionDto:PaymentSessiontDto){
  //   return this.paymentsService.createPaymentSession(paymentSessionDto);
  // }
  @Post('create-payment-session')
  @ApiResponse({ status: 201, description: 'Payment Session Creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createPaymentSession(@Body() createSuscriptionDto:CreateSuscriptionDto){
    return this.paymentsService.createPaymentSession(createSuscriptionDto);
  }


  @Post('webhook')
  @ApiResponse({ status: 201, description: 'Stripe Webhook' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async stripewebhook(@Req() req: Request, @Res() res:Response){
    return this.paymentsService.stripeWebhook(req,res);
  }
  
}
