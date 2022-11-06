import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Pager, Pages } from '../types/pager.type';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentMethod } from './schemas/payment-method.schema';
import { PaymentMethodCreatorSkeleton, PaymentMethodUpdaterSkeleton } from './dto/payment-method.dto';

describe('PaymentMethodController', () => {
  let paymentMethodController: PaymentMethodController;
  let paymentRepository: PaymentRepository;
  let pageable: IPageable<PaymentMethod>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentRepository,
          useValue: {
            countPaymentMethods: jest.fn(),
            getPaymentMethods: jest.fn(),
            getPaymentMethod: jest.fn(),
            createPaymentMethod: jest.fn(),
            updatePaymentMethod: jest.fn(),
            deletePaymentMethod: jest.fn(),
          },
        },
        {
          provide: ClassicPageable<PaymentMethod>,
          useValue: {
            getPages: jest.fn(),
          },
        },
      ],
      controllers: [PaymentMethodController],
    }).compile();

    paymentMethodController = module.get<PaymentMethodController>(PaymentMethodController);
    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
    pageable = module.get<IPageable<PaymentMethod>>(ClassicPageable<PaymentMethod>);
  });

  it('Should be defined', () => expect(paymentMethodController).toBeDefined());

  it('getAll - Should return pageable payment methods', async () => {
    const mockPaymentRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(0));
    const mockPaymentRepositoryGetPaymentMethods = jest
      .spyOn(paymentRepository, 'getPaymentMethods')
      .mockImplementation(() => Promise.resolve([]));
    const mockPageableGetPages = jest
      .spyOn(pageable, 'getPages')
      .mockImplementation(() => new Pager<PaymentMethod>());

    await paymentMethodController.getAll(new Pages());

    expect(mockPaymentRepositoryCountPaymentMethods).toBeCalledTimes(1);
    expect(mockPaymentRepositoryGetPaymentMethods).toBeCalledTimes(1);
    expect(mockPageableGetPages).toBeCalledTimes(1);
  });

  it('getOne - Should throw not found exception', () => {
    const mockPaymentRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await paymentMethodController.getOne("6365f8b85b2fbdbfcaf8165d");
      expect(mockPaymentRepositoryCountPaymentMethods).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOne - Should return a payment method', async () => {
    const mockPaymentRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(1));
    const mockPaymentRepositoryGetPaymentMethod = jest
      .spyOn(paymentRepository, 'getPaymentMethod')
      .mockImplementation(() => Promise.resolve(new PaymentMethod()));

    await paymentMethodController.getOne("6365f8b85b2fbdbfcaf8165d");

    expect(mockPaymentRepositoryCountPaymentMethods).toBeCalledTimes(1);
    expect(mockPaymentRepositoryGetPaymentMethod).toBeCalledTimes(1);
  });

  it('create - Should create a payment method', async () => {
    const mockPaymentRepositoryCreatePaymentMethod = jest
      .spyOn(paymentRepository, 'createPaymentMethod')
      .mockImplementation(() => Promise.resolve(new PaymentMethod()));

    await paymentMethodController.create(new PaymentMethodCreatorSkeleton());

    expect(mockPaymentRepositoryCreatePaymentMethod).toBeCalledTimes(1);
  });

  it('updateOne - Should throw not found exception', () => {
    const mockPaymentMethodRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await paymentMethodController.updateOne("6365f8b85b2fbdbfcaf8165d", new PaymentMethodUpdaterSkeleton());
      expect(mockPaymentMethodRepositoryCountPaymentMethods).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('updateOne - Should return a payment method', async () => {
    const mockPaymentMethodRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(1));
    const mockPaymentMethodRepositoryUpdatePaymentMethod = jest
      .spyOn(paymentRepository, 'updatePaymentMethod')
      .mockImplementation(() => Promise.resolve(new PaymentMethod()));

    await paymentMethodController.updateOne("6365f8b85b2fbdbfcaf8165d", new PaymentMethodUpdaterSkeleton());

    expect(mockPaymentMethodRepositoryCountPaymentMethods).toBeCalledTimes(1);
    expect(mockPaymentMethodRepositoryUpdatePaymentMethod).toBeCalledTimes(1);
  });

  it('deleteOne - Should throw not found exception', () => {
    const mockPaymentMethodRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await paymentMethodController.deleteOne("6365f8b85b2fbdbfcaf8165d");
      expect(mockPaymentMethodRepositoryCountPaymentMethods).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('deleteOne - Should delete a payment method', async () => {
    const mockPaymentMethodRepositoryCountPaymentMethods = jest
      .spyOn(paymentRepository, 'countPaymentMethods')
      .mockImplementation(() => Promise.resolve(1));
    const mockPaymentMethodRepositoryDeletePaymentMethod = jest
      .spyOn(paymentRepository, 'deletePaymentMethod')
      .mockImplementation(() => Promise.resolve());

    await paymentMethodController.deleteOne("6365f8b85b2fbdbfcaf8165d");

    expect(mockPaymentMethodRepositoryCountPaymentMethods).toBeCalledTimes(1);
    expect(mockPaymentMethodRepositoryDeletePaymentMethod).toBeCalledTimes(1);
  });
});
