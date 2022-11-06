import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Headers,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CardCreatorSkeleton } from './dto/card.dto';
import { Card } from './schemas/card.schema';
import { Types } from 'mongoose';
import { Pager, Pages } from '../types/pager.type';
import { IPageable } from '../pager/pageable.interface';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { CardQuantityGuard } from './guards/counter.guard';

@Controller('/api/payments/v1/cards')
export class CardController {
  @Inject(CardRepository)
  private readonly cardService: CardRepository;

  @Inject(ClassicPageable<Card>)
  private readonly pageable: IPageable<Card>;

  @Get()
  async getAll(@Query() pages: Pages): Promise<Pager<Card>> {
    const { offset, limit } = pages;
    const [totalDocs, docs] = await Promise.all([
      this.cardService.count(),
      this.cardService.getAll({}, offset, limit),
    ]);

    return this.pageable.getPages(docs, totalDocs, offset, limit)
  }

  @Get('me')
  async getAllMe(@Headers('user-id') userId: string): Promise<Card[]> {
    return this.cardService.getAll({ customerId: userId });
  }

  @Get('me/:id')
  async getOneMe(@Headers('user-id') userId: string, @Param('id') id: string): Promise<Card> {
    const card: Card = await this.cardService.getOne({ customerId: userId, _id: id });

    if (!card) throw new NotFoundException();

    return card;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Card> {
    const card: Card = await this.cardService.getOne({ _id: id });

    if (!card) throw new NotFoundException();

    return card;
  }

  @Post('me')
  @UseGuards(CardQuantityGuard)
  async create(
    @Headers('user-id') userId: string,
    @Body() card: CardCreatorSkeleton,
  ): Promise<Card> {
    // TODO: Here we need to call the payment gateway for:
    // 1 - Register a card

    const newCard = new Card();

    newCard.token = 'dummy';
    newCard.customerId = new Types.ObjectId(userId);
    newCard.numbers = card.numbers;
    newCard.alias = card.alias;

    return this.cardService.create(newCard);
  }

  @Delete('me/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneMe(@Headers('user-id') userId: string, @Param('id') id: string): Promise<void> {
    const counter = await this.cardService.count({ customerId: userId, _id: id });

    if (!counter) throw new NotFoundException();

    // TODO: Here we need to call the payment gateway for:
    // 1 - Delete a card

    await this.cardService.deleteOne({ _id: new Types.ObjectId(id) });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string): Promise<void> {
    const counter = await this.cardService.count({ _id: id });

    if (!counter) throw new NotFoundException();

    // TODO: Here we need to call the payment gateway for:
    // 1 - Delete a card

    await this.cardService.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
