import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentRepository } from './payment.repository';
import { PaymentMethod } from './schemas/payment-method.schema';
import { Payment } from './schemas/payment.schema';

describe('PaymentRepository', () => {
  let paymentRepository: PaymentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentRepository,
        {
          provide: getModelToken(Payment.name),
          useValue: {},
        },
        {
          provide: getModelToken(PaymentMethod.name),
          useValue: {},
        },
      ],
    }).compile();

    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
  });

  it('Should be defined', () => expect(paymentRepository).toBeDefined());
});
