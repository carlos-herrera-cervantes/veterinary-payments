import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagerModule } from '../pager/pager.module';
import { CardController } from './card.controller';
import { CardRepository } from './card.repository';
import { Card, CardSchema } from './schemas/card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    PagerModule,
  ],
  providers: [
    CardRepository,
  ],
  controllers: [
    CardController,
  ],
})
export class CardModule {}
