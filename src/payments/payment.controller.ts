import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { Pager, Pages } from '../types/pager.type';
import { PaymentCreatorSkeleton } from './dto/payment.dto';
import { PaymentRepository } from './payment.repository';
import { Payment } from './schemas/payment.schema';

@Controller('api/payments/v1/transactions')
export class PaymentController {
  @Inject(PaymentRepository)
  private readonly paymentRepository: PaymentRepository;

  @Inject(ClassicPageable<Payment>)
  private readonly pageable: IPageable<Payment>;

  @Get()
  async getAll(@Query() pages: Pages): Promise<Pager<Payment>> {
    const { offset, limit } = pages;
    const [totalDocs, docs] = await Promise.all([
      this.paymentRepository.countPayments(),
      this.paymentRepository.getPayments({}, offset, limit),
    ]);

    return this.pageable.getPages(docs, totalDocs, offset, limit);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Payment> {
    const counter = await this.paymentRepository.countPayments({ _id: id });

    if (!counter) throw new NotFoundException('Payment not found');

    return this.paymentRepository.getPayment({ _id: id });
  }

  @Post()
  async create(@Body() payment: PaymentCreatorSkeleton): Promise<Payment> {
    return this.paymentRepository.createPayment(payment);
  }
}
