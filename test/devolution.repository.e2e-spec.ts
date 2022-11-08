import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { DevolutionCreatorSkeleton, DevolutionUpdaterSkeleton } from '../src/devolutions/dto/devolution.dto';
import { DevolutionModule } from '../src/devolutions/devolution.module';
import { DevolutionRepository } from '../src/devolutions/devolution.repository';

let app: INestApplication;
let devolutionRepository: DevolutionRepository;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(process.env.TEST_DB),
      DevolutionModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  devolutionRepository = module.get<DevolutionRepository>(DevolutionRepository);
});

afterAll(async () => await app.close());

describe('DevolutionRepository', () => {
  it('getAll - Should return empty list', async () => {
    const list = await devolutionRepository.getAll();
    expect(list.length).toBeFalsy();
  });

  it('getOne - Should return empty document', async () => {
    const document = await devolutionRepository.getOne();
    expect(document).toBeNull();
  });

  it('count - Should return 0 documents', async () => {
    const counter = await devolutionRepository.count();
    expect(counter).toBeFalsy();
  });

  it('create, updateOne, deleteOne - Should create, update and delete a document', async () => {
    const devolution = new DevolutionCreatorSkeleton();
    devolution.serviceId = '636932bec57ee020eb45350d';
    devolution.customerId = '636932cb1924758d03050e5e';
    devolution.quantity = 100;
    devolution.comment = 'This is an integration test';

    const insertResult = await devolutionRepository.create(devolution);
    expect(insertResult._id).not.toBeNull();
    
    const devolutionUpdater = new DevolutionUpdaterSkeleton();
    devolutionUpdater.comment = 'This is an update';
    const updateResult = await devolutionRepository.updateOne({ _id: insertResult._id }, devolutionUpdater);
    expect(updateResult.comment).toEqual('This is an update');

    await devolutionRepository.deleteOne({ _id: insertResult._id });
    const counterAfterDelete = await devolutionRepository.count();
    expect(counterAfterDelete).toBeFalsy();
  });
});
