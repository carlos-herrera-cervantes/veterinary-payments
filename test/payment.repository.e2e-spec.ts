import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { PaymentMethodCreatorSkeleton, PaymentMethodUpdaterSkeleton } from '../src/payments/dto/payment-method.dto';
import { PaymentCreatorSkeleton } from '../src/payments/dto/payment.dto';
import { PaymentModule } from '../src/payments/payment.module';
import { PaymentRepository } from '../src/payments/payment.repository';

let app: INestApplication;
let paymentRepository: PaymentRepository;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(process.env.TEST_DB),
      PaymentModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  paymentRepository = module.get<PaymentRepository>(PaymentRepository);
});

afterAll(async () => await app.close());

describe('PaymentRepository', () => {
  it('getPayment - Should return empty document', async () => {
    const document = await paymentRepository.getPayment();
    expect(document).toBeNull();
  });

  it('getPayments - Should return empty list', async () => {
    const list = await paymentRepository.getPayments();
    expect(list.length).toBeFalsy();
  });

  it('countPayments - Should return 0 documents', async () => {
    const counter = await paymentRepository.countPayments();
    expect(counter).toBeFalsy();
  });

  it('createPayment - Should create a payment', async () => {
    const payment = new PaymentCreatorSkeleton();
    payment.paymentMethodId = '6369435c11d651b3f6472f49';
    payment.serviceId = '6369436cdc4292886e147564';

    const insertResult = await paymentRepository.createPayment(payment);
    expect(insertResult._id).not.toBeNull();

    const counterBeforeDelete = await paymentRepository.countPayments();
    expect(counterBeforeDelete).toBeTruthy();

    await paymentRepository.deletePayment({ _id: insertResult._id });
    const counterAfterDelete = await paymentRepository.countPayments();
    expect(counterAfterDelete).toBeFalsy();
  });

  it('getPaymentMethod - Should return empty document', async () => {
    const document = await paymentRepository.getPaymentMethod();
    expect(document).toBeNull();
  });

  it('getPaymentMethods - Should return empty list', async () => {
    const list = await paymentRepository.getPaymentMethods();
    expect(list.length).toBeFalsy();
  });

  it('counPaymentMethods - Should return 0 documents', async () => {
    const counter = await paymentRepository.countPaymentMethods();
    expect(counter).toBeFalsy();
  });

  it('createPaymentMethod, updatePaymentMethod, deletePaymentMethod - Should create, update and delete a payment method', async () => {
    const paymentMethodCreator = new PaymentMethodCreatorSkeleton();
    paymentMethodCreator.name = 'Cash';
    paymentMethodCreator.description = 'Cash payment';

    const insertResult = await paymentRepository.createPaymentMethod(paymentMethodCreator);
    expect(insertResult._id).not.toBeNull();

    const paymentMethodUpdater = new PaymentMethodUpdaterSkeleton();
    paymentMethodUpdater.description = 'This is an update for cash payment';
    const updateResult = await paymentRepository.updatePaymentMethod({ _id: insertResult._id }, paymentMethodUpdater);
    expect(updateResult.description).toEqual('This is an update for cash payment');

    await paymentRepository.deletePaymentMethod({ _id: insertResult._id });
    const counterAfterDelete = await paymentRepository.countPaymentMethods();
    expect(counterAfterDelete).toBeFalsy();
  });
});
