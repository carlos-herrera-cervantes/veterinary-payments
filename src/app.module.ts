import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountModule } from './bank-accounts/bank-account.module';
import { CardModule } from './cards/card.module';
import { DevolutionModule } from './devolutions/devolution.module';
import { PagerModule } from './pager/pager.module';
import { PaymentModule } from './payments/payment.module';
import { MongoConfig } from './config/mongo.config';

@Module({
  imports: [
    MongooseModule.forRoot(MongoConfig.DefaultDb),
    CardModule,
    BankAccountModule,
    PagerModule,
    DevolutionModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
