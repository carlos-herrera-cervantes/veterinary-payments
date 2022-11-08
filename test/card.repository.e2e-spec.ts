import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CardModule } from '../src/cards/card.module';
import { CardRepository } from '../src/cards/card.repository';
import { Card } from '../src/cards/schemas/card.schema';

let app: INestApplication;
let cardRepository: CardRepository;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(process.env.TEST_DB),
      CardModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  cardRepository = module.get<CardRepository>(CardRepository);
});

afterAll(async () => await app.close());

describe('CardRepository', () => {
  it('getAll - Should return empty list', async () => {
    const list = await cardRepository.getAll();
    expect(list.length).toBeFalsy();
  });

  it('getOne - Should return empty document', async () => {
    const document = await cardRepository.getOne();
    expect(document).toBeNull();
  });

  it('count - Should return 0 documents', async () => {
    const counter = await cardRepository.count();
    expect(counter).toBeFalsy();
  });

  it('create, deleteOne - Should create and delete a document', async () => {
    const card = new Card();
    card.token = 'dummy';
    card.customerId = new Types.ObjectId('636929c5c90c891c640d3206');
    card.numbers = '5136000164528347';
    card.alias = 'Mastercard';

    const insertResult = await cardRepository.create(card);
    expect(insertResult._id).not.toBeNull();

    const counterBeforeDelete = await cardRepository.count();
    expect(counterBeforeDelete).toBeTruthy();

    await cardRepository.deleteOne();
    const counterAfterDelete = await cardRepository.count();
    expect(counterAfterDelete).toBeFalsy();
  });
});
