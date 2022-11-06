import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Pager, Pages } from '../types/pager.type';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { DevolutionController } from './devolution.controller';
import { DevolutionRepository } from './devolution.repository';
import { Devolution } from './schemas/devolution.schema';
import { DevolutionCreatorSkeleton, DevolutionUpdaterSkeleton } from './dto/devolution.dto';

describe('DevolutionController', () => {
  let devolutionController: DevolutionController;
  let devolutionRepository: DevolutionRepository;
  let pageable: IPageable<Devolution>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DevolutionRepository,
          useValue: {
            count: jest.fn(),
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
        {
          provide: ClassicPageable<Devolution>,
          useValue: {
            getPages: jest.fn(),
          },
        },
      ],
      controllers: [DevolutionController],
    }).compile();

    devolutionController = module.get<DevolutionController>(DevolutionController);
    devolutionRepository = module.get<DevolutionRepository>(DevolutionRepository);
    pageable = module.get<IPageable<Devolution>>(ClassicPageable<Devolution>);
  });

  it('Should be defined', () => expect(devolutionController).toBeDefined());

  it('getAll - Should return pageable devolution', async () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));
    const mockDevolutionRepositoryGetAll = jest
      .spyOn(devolutionRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([]));
    const mockPageableGetPages = jest
      .spyOn(pageable, 'getPages')
      .mockImplementation(() => new Pager<Devolution>());

    await devolutionController.getAll(new Pages());

    expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    expect(mockDevolutionRepositoryGetAll).toBeCalledTimes(1);
    expect(mockPageableGetPages).toBeCalledTimes(1);
  });

  it('getAllMe - Should return pageable devolution', async () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));
    const mockDevolutionRepositoryGetAll = jest
      .spyOn(devolutionRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([]));
    const mockPageableGetPages = jest
      .spyOn(pageable, 'getPages')
      .mockImplementation(() => new Pager<Devolution>());

    await devolutionController.getAllMe("6365b22da4296290f3d54c26", new Pages());

    expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    expect(mockDevolutionRepositoryGetAll).toBeCalledTimes(1);
    expect(mockPageableGetPages).toBeCalledTimes(1);
  });

  it('getOne - Should throw not found exception', () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await devolutionController.getOne("6365b22da4296290f3d54c26");
      expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOne - Should return a devolution', async () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockDevolutionRepositoryGetOne = jest
      .spyOn(devolutionRepository, 'getOne')
      .mockImplementation(() => Promise.resolve(new Devolution()));

    await devolutionController.getOne("6365b22da4296290f3d54c26");

    expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    expect(mockDevolutionRepositoryGetOne).toBeCalledTimes(1);
  });

  it('getOneMe - Should throw a not found exception', () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await devolutionController.getOneMe("6365cbaba5be208173343578", "6365b22da4296290f3d54c26");
      expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOneMe - Should return a devolution', async () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockDevolutionRepositoryGetOne = jest
      .spyOn(devolutionRepository, 'getOne')
      .mockImplementation(() => Promise.resolve(new Devolution()));

    await devolutionController.getOneMe("6365cbaba5be208173343578", "6365b22da4296290f3d54c26");

    expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    expect(mockDevolutionRepositoryGetOne).toBeCalledTimes(1);
  });

  it('create - Should create a devolution', async () => {
    const mockDevolutionRepositoryCreate = jest
      .spyOn(devolutionRepository, 'create')
      .mockImplementation(() => Promise.resolve(new Devolution()));

    await devolutionController.create(new DevolutionCreatorSkeleton());

    expect(mockDevolutionRepositoryCreate).toBeCalledTimes(1);
  });

  it('updateOne - Should update a devolution', async () => {
    const mockDevolutionRepositoryUpdateOne = jest
      .spyOn(devolutionRepository, 'updateOne')
      .mockImplementation(() => Promise.resolve(new Devolution()));

    await devolutionController.updateOne("6365b22da4296290f3d54c26", new DevolutionUpdaterSkeleton());

    expect(mockDevolutionRepositoryUpdateOne).toBeCalledTimes(1);
  });

  it('deleteOne - Should throw a not found exception', () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await devolutionController.deleteOne("6365b22da4296290f3d54c26");
      expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('deleteOne - Should delete a devolution', async () => {
    const mockDevolutionRepositoryCount = jest
      .spyOn(devolutionRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockDevolutionRepositoryDeleteOne = jest
      .spyOn(devolutionRepository, 'deleteOne')
      .mockImplementation(() => Promise.resolve(null));

    await devolutionController.deleteOne("6365b22da4296290f3d54c26");

    expect(mockDevolutionRepositoryCount).toBeCalledTimes(1);
    expect(mockDevolutionRepositoryDeleteOne).toBeCalledTimes(1);
  });
});
