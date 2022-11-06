import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentMethodDocument = PaymentMethod & Document

@Schema({ versionKey: false, collection: 'payment-methods' })
export class PaymentMethod {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

PaymentMethodSchema.pre<PaymentMethodDocument>('save', function () {
  if (this.isNew) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
});
