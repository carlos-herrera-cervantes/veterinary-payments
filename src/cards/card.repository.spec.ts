import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CardRepository } from './card.repository';
import { Card } from './schemas/card.schema';

describe('CardRepository', () => {
  let cardRepository: CardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardRepository,
        {
          provide: getModelToken(Card.name),
          useValue: {},
        },
      ],
    }).compile();

    cardRepository = module.get<CardRepository>(CardRepository);
  });

  it('Should be defined', () => expect(cardRepository).toBeDefined());
});
