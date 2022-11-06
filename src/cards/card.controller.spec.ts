import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Pager, Pages } from '../types/pager.type';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { CardController } from './card.controller';
import { CardRepository } from './card.repository';
import { Card } from './schemas/card.schema';
import { CardCreatorSkeleton } from './dto/card.dto';

describe('CardController', () => {
  let cardController: CardController;
  let cardRepository: CardRepository;
  let pageable: IPageable<Card>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CardRepository,
          useValue: {
            count: jest.fn(),
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
          }
        },
        {
          provide: ClassicPageable<Card>,
          useValue: {
            getPages: jest.fn(),
          },
        },
      ],
      controllers: [CardController],
    }).compile();

    cardController = module.get<CardController>(CardController);
    cardRepository = module.get<CardRepository>(CardRepository);
    pageable = module.get<IPageable<Card>>(ClassicPageable<Card>);
  });

  it('Should be defined', () => expect(cardController).toBeDefined());

  it('getAll - Should return pageable cards', async () => {
    const mockCardRepositoryCount = jest
      .spyOn(cardRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));
    const mockCardRepositoryGetAll = jest
      .spyOn(cardRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([]));
    const mockPageableGetPages = jest
      .spyOn(pageable, 'getPages')
      .mockImplementation(() => new Pager());

    await cardController.getAll(new Pages());

    expect(mockCardRepositoryCount).toBeCalledTimes(1);
    expect(mockCardRepositoryGetAll).toBeCalledTimes(1);
    expect(mockPageableGetPages).toBeCalledTimes(1);
  });

  it('getAllMe - Should return pageable cards', async () => {
    const mockCardRepositoryGetAll = jest
      .spyOn(cardRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([]));

    await cardController.getAllMe("dummy-user-id");

    expect(mockCardRepositoryGetAll).toBeCalledTimes(1);
  });

  it('getOneMe - Should throw not found exception', () => {
    const mockCardRepositoryGetOne = jest
      .spyOn(cardRepository, 'getOne')
      .mockImplementation(() => Promise.resolve(null));

    expect(async () => {
      await cardController.getOneMe("dummy-user-id", "dummy-card-id");
      expect(mockCardRepositoryGetOne).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOneMe - Should return a card', async () => {
    const mockCardRepositoryGetOne = jest
      .spyOn(cardRepository, 'getOne')
      .mockImplementation(() => Promise.resolve(new Card()));

    await cardController.getOneMe("dummy-user-id", "dummy-card-id");

    expect(mockCardRepositoryGetOne).toBeCalledTimes(1);
  });

  it('create - Should create a card', async () => {
    const mockCardRepositoryCreate = jest
      .spyOn(cardRepository, 'create')
      .mockImplementation(() => Promise.resolve(new Card()));

    await cardController.create("6365b22da4296290f3d54c26", new CardCreatorSkeleton());

    expect(mockCardRepositoryCreate).toBeCalledTimes(1);
  });

  it('deleteOneMe - Should throw not found exception', () => {
    const mockCardRepositoryCount = jest
      .spyOn(cardRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

      expect(async () => {
        await cardController.deleteOneMe("dummy-user-id", "dummy-card-id");
        expect(mockCardRepositoryCount).toBeCalledTimes(1);
      })
      .rejects
      .toThrow(NotFoundException);
  });

  it('deleteOneMe - Should delete a card', async () => {
    const mockCardRepositoryCount = jest
      .spyOn(cardRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockCardRepositoryDeleteOne = jest
      .spyOn(cardRepository, 'deleteOne')
      .mockImplementation(() => Promise.resolve());

    await cardController.deleteOneMe("dummy-user-id", "6365b22da4296290f3d54c26");

    expect(mockCardRepositoryCount).toBeCalledTimes(1);
    expect(mockCardRepositoryDeleteOne).toBeCalledTimes(1);
  });

  it('deleteOne - Should throw not found exception', () => {
    const mockCardRepositoryCount = jest
      .spyOn(cardRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await cardController.deleteOne("6365b22da4296290f3d54c26");
      expect(mockCardRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('deleteOne - Should delete a card', async () => {
    const mockCardRepositoryCount = jest
      .spyOn(cardRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockCardRepositoryDeleteOne = jest
      .spyOn(cardRepository, 'deleteOne')
      .mockImplementation(() => Promise.resolve());

    await cardController.deleteOne("6365b22da4296290f3d54c26");

    expect(mockCardRepositoryCount).toBeCalledTimes(1);
    expect(mockCardRepositoryDeleteOne).toBeCalledTimes(1);
  });
});
