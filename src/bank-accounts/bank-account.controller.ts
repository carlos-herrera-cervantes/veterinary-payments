import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Param,
  Post,
  Headers,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common';
import { BankAccountCreatorSkeleton } from './dto/bank-account.dto';
import { BankAccountRepository } from './bank-account.repository';
import { BankAccount } from './schemas/bank-account.schema';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { Pager, Pages } from '../types/pager.type';
import { IPageable } from 'src/pager/pageable.interface';

@Controller('/api/payments/v1/bank-accounts')
export class BankAccountController {
  @Inject(BankAccountRepository)
  private readonly bankAccountRepository: BankAccountRepository;

  @Inject(ClassicPageable<BankAccount>)
  private readonly pageable: IPageable<BankAccount>;

  @Get()
  async getAll(@Query() pages: Pages): Promise<Pager<BankAccount>> {
    const { offset, limit } = pages;
    const [totalDocs, docs] = await Promise.all([
      this.bankAccountRepository.count(),
      this.bankAccountRepository.getAll({}, offset, limit),
    ]);

    return this.pageable.getPages(docs, totalDocs, offset, limit);
  }

  @Get('me')
  async getOneMe(@Headers('user-id') userId: string): Promise<BankAccount> {
    const counter = await this.bankAccountRepository.count({ customerId: userId });

    if (!counter) throw new NotFoundException('You have no bank account');

    return await this.bankAccountRepository.getOne({ customerId: userId });
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<BankAccount> {
    const counter = await this.bankAccountRepository.count({ _id: id });

    if (!counter) throw new NotFoundException('You have no bank account');

    return await this.bankAccountRepository.getOne({ _id: id });
  }

  @Post('me')
  async create(
    @Headers('user-id') userId: string,
    @Body() account: BankAccountCreatorSkeleton,
  ): Promise<BankAccount> {
    // TODO: Here we need to call the payment gateway for;
    // 1 - Register a bank account

    account.customerId = userId;

    return this.bankAccountRepository.create(account);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string): Promise<void> {
    const counter = await this.bankAccountRepository.count({ _id: id });

    if (!counter) throw new NotFoundException('Bank account not found');

    // TODO: Here we need to call the payment gateway for;
    // 1 - Delete bank account

    await this.bankAccountRepository.deleteOne({ _id: id });
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneMe(@Headers('user-id') userId: string): Promise<void> {
    const counter = await this.bankAccountRepository.count({ customerId: userId });

    if (!counter) throw new NotFoundException('You have no bank account');

    // TODO: Here we need to call the payment gateway for;
    // 1 - Delete bank account

    await this.bankAccountRepository.deleteOne({ customer_id: userId });
  }
}
