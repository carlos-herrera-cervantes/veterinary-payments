import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaymentMethodCreatorSkeleton, PaymentMethodUpdaterSkeleton } from './dto/payment-method.dto';
import { PaymentCreatorSkeleton } from './dto/payment.dto';
import { PaymentMethod, PaymentMethodDocument } from './schemas/payment-method.schema';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentRepository {
  @InjectModel(Payment.name)
  private readonly paymentModel: Model<PaymentDocument>;

  @InjectModel(PaymentMethod.name)
  private readonly paymentMethodModel: Model<PaymentMethodDocument>;

  async getPayment(filter?: FilterQuery<Payment>): Promise<Payment> {
    return this.paymentModel.findOne(filter);
  }

  async getPayments(filter?: FilterQuery<Payment>, offset = 0, limit = 10): Promise<Payment[]> {
    return this.paymentModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset * limit)
      .limit(limit);
  }

  async createPayment(payment: PaymentCreatorSkeleton): Promise<Payment> {
    return this.paymentModel.create(payment);
  }

  async countPayments(filter?: FilterQuery<Payment>): Promise<number> {
    return this.paymentModel.countDocuments(filter);
  }

  async getPaymentMethod(filter?: FilterQuery<PaymentMethod>): Promise<PaymentMethod> {
    return this.paymentMethodModel.findOne(filter);
  }

  async getPaymentMethods(filter?: FilterQuery<PaymentMethod>, offset = 0, limit = 10): Promise<PaymentMethod[]> {
    return this.paymentMethodModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset * limit)
      .limit(limit);
  }

  async countPaymentMethods(filter?: FilterQuery<PaymentMethod>): Promise<number> {
    return this.paymentMethodModel.countDocuments(filter);
  }

  async createPaymentMethod(paymentMethod: PaymentMethodCreatorSkeleton): Promise<PaymentMethod> {
    return this.paymentMethodModel.create(paymentMethod);
  }

  async updatePaymentMethod(
    filter: FilterQuery<PaymentMethod>,
    paymentMethod: PaymentMethodUpdaterSkeleton
  ): Promise<PaymentMethod> {
    return this.paymentMethodModel.findOneAndUpdate(filter, { $set: paymentMethod }, { new: true });
  }

  async deletePaymentMethod(filter: FilterQuery<PaymentMethod>): Promise<void> {
    await this.paymentMethodModel.deleteOne(filter);
  }
}
