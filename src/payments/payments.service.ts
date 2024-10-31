import { forwardRef, Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
// import { PaymentSessiontDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateSuscriptionDto } from 'src/suscriptions/dto/create-suscription.dto';
import { Suscription } from 'src/suscriptions/entities/suscription.entity';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';
@Injectable()
export class PaymentsService {


  constructor(

    @InjectRepository(Suscription)
    private readonly suscriptionRepository: Repository<Suscription>,

    @Inject(forwardRef(() => SuscriptionsService))
    private readonly suscriptionsService: SuscriptionsService,

    private readonly dataSource: DataSource,
  ) { }

  private readonly stripe = new Stripe(process.env.STRIPE_SECRET);

  async createPaymentSession(paymenSessionDto: CreateSuscriptionDto) {
    console.log(paymenSessionDto);
    // const { items, orderId, typePayment, idUser } = paymenSessionDto;

    // const lineItems = items.map(item => {

    //   return {
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: item.name
    //       },
    //       unit_amount: Math.round(item.price * 100)
    //     },
    //     quantity: item.quantity
    //   };

    // });

    const code = this.suscriptionsService.generateCode();

    const session = await this.stripe.checkout.sessions.create({

      payment_intent_data: {
        metadata: {
          orderId: paymenSessionDto.idMall,
          title: paymenSessionDto.title,
          mount: paymenSessionDto.mount,
          date: paymenSessionDto.date,
          idMall: paymenSessionDto.idMall,
          code: code,
        }
      },

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: paymenSessionDto.title,
              description: "Descripción de la suscripción",
              images: ["https://www.creativefabrica.com/wp-content/uploads/2020/03/09/trolley-shopping-cart-icon-logo-Ideas-I-Graphics-3452854-1-580x387.jpg"],
            },
            unit_amount: Math.round(paymenSessionDto.mount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success/' + code,
      cancel_url: 'https://example.com/cancel',

    });

    return {
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url,
    }
  }


  async stripeWebhook(req: Request, res: Response) {
    console.log('Llega el webhook');
    console.log('Headers:', req.headers);
    console.log('Raw body:', req['rawBody']);

    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.stripeEndpointSecret;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],  // `rawBody` sin modificar
        sig,
        endpointSecret,
      );
      console.log('Evento de Stripe:', event);
    } catch (err) {
      console.log("Error en la verificación de firma:", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Procesa el evento de Stripe
    switch (event.type) {
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;
        console.log('Evento de carga exitosa:', charge);
        // mount: paymenSessionDto.mount,
        //   date: paymenSessionDto.date,
        //   idMall: paymenSessionDto.idMall,
        const suscription = this.suscriptionRepository.create({
          code: charge.metadata.code,
          title: charge.metadata.title,
          mount: charge.metadata.mount ? parseFloat(charge.metadata.mount) : 0,
          date: charge.metadata.date,
          idMall: { id: charge.metadata.idMall } as any,
        });

        /* return await this.suscriptionRepository.save(suscription); */
        const savedSuscription = await this.suscriptionRepository.save(suscription);

        console.log('Suscripción guardada:', savedSuscription);

        res.status(200).json({ received: true, suscription: savedSuscription });

        break;

      default:
        console.log(`Evento ${event.type} no manejado`);
    }

    res.status(200).json({ received: true });
  }
}
