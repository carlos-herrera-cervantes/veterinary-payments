import { TestingModule, Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Pager, Pages } from '../types/pager.type';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { Payment } from './schemas/payment.schema';
import { PaymentCreatorSkeleton } from './dto/payment.dto';

describe('PaymentController', () => {
  let paymentRepository: PaymentRepository;
  let pageable: IPageable<Payment>;
  let paymentController: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentRepository,
          useValue: {
            countPayments: jest.fn(),
            getPayments: jest.fn(),
            getPayment: jest.fn(),
            createPayment: jest.fn(),
          },
        },
        {
          provide: ClassicPageable<Payment>,
          useValue: {
            getPages: jest.fn(),
          },
        },
      ],
      controllers: [PaymentController],
    }).compile();

    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
    pageable = module.get<IPageable<Payment>>(ClassicPageable<Payment>);
    paymentController = module.get<PaymentController>(PaymentController);
  });

  it('Should be defined', () => expect(paymentController).toBeDefined());

  it('getAll', async () => {
    const mockPaymentRepositoryCountPayments = jest
      .spyOn(paymentRepository, 'countPayments')
      .mockImplementation(() => Promise.resolve(0));
    const mockPaymentRepositoryGetPayments = jest
      .spyOn(paymentRepository, 'getPayments')
      .mockImplementation(() => Promise.resolve([]));
    const mockPageableGetPages = jest
      .spyOn(pageable, 'getPages')
      .mockImplementation(() => new Pager<Payment>());

    await paymentController.getAll(new Pages());

    expect(mockPaymentRepositoryCountPayments).toBeCalledTimes(1);
    expect(mockPaymentRepositoryGetPayments).toBeCalledTimes(1);
    expect(mockPageableGetPages).toBeCalledTimes(1);
  });

  it('getOne - Should throw not found exception', () => {
    const mockPaymentRepositoryCountPayments = jest
      .spyOn(paymentRepository, 'countPayments')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await paymentController.getOne("6365e4395ffc0297b04d9fd2");
      expect(mockPaymentRepositoryCountPayments).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOne - Should return a payment', async () => {
    const mockPaymentRepositoryCountPayments = jest
      .spyOn(paymentRepository, 'countPayments')
      .mockImplementation(() => Promise.resolve(1));
    const mockPaymentRepositoryGetPayment = jest
      .spyOn(paymentRepository, 'getPayment')
      .mockImplementation(() => Promise.resolve(new Payment()));

    await paymentController.getOne("6365e4395ffc0297b04d9fd2");

    expect(mockPaymentRepositoryCountPayments).toBeCalledTimes(1);
    expect(mockPaymentRepositoryGetPayment).toBeCalledTimes(1);
  });

  it('create - Should create a payment', async () => {
    const mockPaymentRepositoryCreate = jest
      .spyOn(paymentRepository, 'createPayment')
      .mockImplementation(() => Promise.resolve(new Payment()));

    await paymentController.create(new PaymentCreatorSkeleton());

    expect(mockPaymentRepositoryCreate).toBeCalledTimes(1);
  });
});
