import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { DevolutionRepository } from './devolution.repository';
import { Devolution } from './schemas/devolution.schema';

describe('DevolutionRepository', () => {
  let devolutionRepository: DevolutionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevolutionRepository,
        {
          provide: getModelToken(Devolution.name),
          useValue: {},
        },
      ],
    }).compile();

    devolutionRepository = module.get<DevolutionRepository>(DevolutionRepository);
  });

  it('Should be defined', () => expect(devolutionRepository).toBeDefined());
});
