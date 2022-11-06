import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagerModule } from '../pager/pager.module';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentMethod, PaymentMethodSchema } from './schemas/payment-method.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
    PagerModule,
  ],
  providers: [PaymentRepository],
  controllers: [PaymentController, PaymentMethodController],
})
export class PaymentModule {}
