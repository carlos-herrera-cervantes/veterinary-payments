import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountRepository } from './bank-account.repository';
import { BankAccount } from './schemas/bank-account.schema';

describe('BankAccountRepository', () => {
  let bankAccountRepository: BankAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountRepository,
        {
          provide: getModelToken(BankAccount.name),
          useValue: {},
        },
      ],
    }).compile();

    bankAccountRepository = module.get<BankAccountRepository>(BankAccountRepository);
  });

  it('Should be defined', () => expect(bankAccountRepository).toBeDefined());
});
