import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type BankAccountDocument = BankAccount & Document;

@Schema({ versionKey: false, collection: 'escort_bank_accounts' })
export class BankAccount {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  customerId: Types.ObjectId;

  @Prop()
  clabe: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);

BankAccountSchema.pre<BankAccountDocument>('save', function () {
  if (this.isNew) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }

  this.clabe = this.clabe.replace(/.(?=.{4})/g, 'X');
});
