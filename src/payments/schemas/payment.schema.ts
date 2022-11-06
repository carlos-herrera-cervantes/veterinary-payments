import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type PaymentDocument = Payment & Document

@Schema({ versionKey: false, collection: 'payments' })
export class Payment {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  paymentMethodId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, default: null })
  cardId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  serviceId: Types.ObjectId;

  @Prop()
  logRequest: string;

  @Prop()
  logResponse: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.pre<PaymentDocument>('save', function () {
  if (this.isNew) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
});
