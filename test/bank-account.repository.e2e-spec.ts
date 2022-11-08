import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { BankAccountModule } from '../src/bank-accounts/bank-account.module';
import { BankAccountRepository } from '../src/bank-accounts/bank-account.repository';
import { BankAccountCreatorSkeleton } from '../src/bank-accounts/dto/bank-account.dto';

let app: INestApplication;
let bankAccountRepository: BankAccountRepository;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(process.env.TEST_DB),
      BankAccountModule,
    ],
  }).compile();

  app = module.createNestApplication();
  await app.init();

  bankAccountRepository = module.get<BankAccountRepository>(BankAccountRepository);
});

afterAll(async () => await app.close());

describe('BankAccountRepository', () => {
  it('count - Should return 0 when counting documents', async () => {
    const counter = await bankAccountRepository.count();
    expect(counter).toBeFalsy();
  });

  it('getAll - Should return empty list', async () => {
    const list = await bankAccountRepository.getAll();
    expect(list.length).toBeFalsy();
  });

  it('getOne - Should return empty document', async () => {
    const document = await bankAccountRepository.getOne();
    expect(document).toBeNull();
  });

  it('create, deleteOne - Should create and delete a document', async () => {
    const bankAccount = new BankAccountCreatorSkeleton();
    bankAccount.customerId = '6368b6e0665c91fa52f641c1';
    bankAccount.clabe = '014027000000000008';

    const insertResult = await bankAccountRepository.create(bankAccount);
    expect(insertResult._id).not.toBeNull();

    const counterBeforeDelete = await bankAccountRepository.count();
    expect(counterBeforeDelete).toBeTruthy();

    await bankAccountRepository.deleteOne({ _id: insertResult._id });
    const counterAfterDelete = await bankAccountRepository.count();
    expect(counterAfterDelete).toBeFalsy();
  });
});
