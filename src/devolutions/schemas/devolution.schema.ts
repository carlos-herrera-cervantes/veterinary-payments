import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema, Document } from 'mongoose';

export type DevolutionDocument = Devolution & Document

@Schema({ versionKey: false, collection: 'devolutions' })
export class Devolution {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  serviceId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  customerId: Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  comment: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const DevolutionSchema = SchemaFactory.createForClass(Devolution);

DevolutionSchema.pre<DevolutionDocument>('save', function () {
  if (this.isNew) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
});
