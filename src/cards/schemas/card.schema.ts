import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type CardDocument = Card & Document;

@Schema({ versionKey: false, collection: 'cards' })
export class Card {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  customerId: Types.ObjectId;

  @Prop()
  token: string;

  @Prop()
  numbers: string;

  @Prop({ default: false })
  default: boolean;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  alias: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);

CardSchema.pre<CardDocument>('save', function () {
  if (this.isNew) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }

  this.numbers = this.numbers.replace(/.(?=.{4})/g, 'X');
});
