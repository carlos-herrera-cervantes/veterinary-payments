import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagerModule } from '../pager/pager.module';
import { BankAccountController } from './bank-account.controller';
import { BankAccountRepository } from './bank-account.repository';
import { BankAccount, BankAccountSchema } from './schemas/bank-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankAccount.name, schema: BankAccountSchema }
    ]),
    PagerModule,
  ],
  providers: [BankAccountRepository],
  controllers: [BankAccountController],
})
export class BankAccountModule {}
