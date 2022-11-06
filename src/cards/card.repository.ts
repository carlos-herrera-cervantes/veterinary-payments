import { ConflictException, Injectable } from '@nestjs/common';
import { Card, CardDocument } from './schemas/card.schema';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MAXIMUM_CARDS } from './constants/card.constant';

@Injectable()
export class CardRepository {
  @InjectModel(Card.name)
  private readonly cardModel: Model<CardDocument>;

  async getAll(filter?: FilterQuery<Card>, offset = 0, limit = 10): Promise<Card[]> {
    return this.cardModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset * limit)
      .limit(limit);
  }

  async getOne(filter?: FilterQuery<Card>): Promise<Card> {
    return this.cardModel.findOne(filter);
  }

  async create(card: Card): Promise<Card> {
    const totalCards: number = await this.cardModel.count({
      customerId: card.customerId,
    });

    if (totalCards >= MAXIMUM_CARDS) throw new ConflictException();

    return this.cardModel.create(card);
  }

  async deleteOne(filter?: FilterQuery<Card>): Promise<void> {
    return this.cardModel.findOneAndDelete(filter);
  }

  async count(filter?: FilterQuery<Card>): Promise<number> {
    return this.cardModel.count(filter);
  }
}
