import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { Pager, Pages } from '../types/pager.type';
import { PaymentMethodCreatorSkeleton, PaymentMethodUpdaterSkeleton } from './dto/payment-method.dto';
import { PaymentRepository } from './payment.repository';
import { PaymentMethod } from './schemas/payment-method.schema';

@Controller('api/payments/v1/methods')
export class PaymentMethodController {
  @Inject(PaymentRepository)
  private readonly paymentRepository: PaymentRepository;

  @Inject(ClassicPageable<PaymentMethod>)
  private readonly pageable: IPageable<PaymentMethod>;

  @Get()
  async getAll(@Query() pages: Pages): Promise<Pager<PaymentMethod>> {
    const { offset, limit } = pages;
    const [totalDocs, docs] = await Promise.all([
      this.paymentRepository.countPaymentMethods(),
      this.paymentRepository.getPaymentMethods({}, offset, limit),
    ]);

    return this.pageable.getPages(docs, totalDocs, offset, limit);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PaymentMethod> {
    const counter = await this.paymentRepository.countPaymentMethods({ _id: id });

    if (!counter) throw new NotFoundException('Payment method not found');

    return this.paymentRepository.getPaymentMethod({ _id: id });
  }

  @Post()
  async create(@Body() paymentMethod: PaymentMethodCreatorSkeleton): Promise<PaymentMethod> {
    return this.paymentRepository.createPaymentMethod(paymentMethod);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() paymentMethod: PaymentMethodUpdaterSkeleton
  ): Promise<PaymentMethod> {
    const counter = await this.paymentRepository.countPaymentMethods({ _id: id });

    if (!counter) throw new NotFoundException('Payment method not found');

    return this.paymentRepository.updatePaymentMethod({ _id: id }, paymentMethod);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string): Promise<void> {
    const counter = await this.paymentRepository.countPaymentMethods({ _id: id });

    if (!counter) throw new NotFoundException('Payment method not found');

    return this.paymentRepository.deletePaymentMethod({ _id: id });
  }
}
