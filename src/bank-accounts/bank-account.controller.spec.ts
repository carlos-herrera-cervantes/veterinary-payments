import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IPageable } from '../pager/pageable.interface';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { BankAccountController } from './bank-account.controller';
import { BankAccountRepository } from './bank-account.repository';
import { BankAccount } from './schemas/bank-account.schema';
import { Pager, Pages } from '../types/pager.type';
import { BankAccountCreatorSkeleton } from './dto/bank-account.dto';

describe('BankAccountController', () => {
  let bankAccountController: BankAccountController;
  let bankAccountRepository: BankAccountRepository;
  let pageable: IPageable<BankAccount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BankAccountRepository,
          useValue: {
            count: jest.fn(),
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
        {
          provide: ClassicPageable<BankAccount>,
          useValue: {
            getPages: jest.fn(),
          },
        },
      ],
      controllers: [BankAccountController],
    }).compile();

    bankAccountController = module.get<BankAccountController>(BankAccountController);
    bankAccountRepository = module.get<BankAccountRepository>(BankAccountRepository);
    pageable = module.get<IPageable<BankAccount>>(ClassicPageable<BankAccount>);
  });

  it('Should be defined', () => expect(bankAccountController).toBeDefined());

  it('getAll - Should return pageable documents', async () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockBankAccountRepositoryGetAll = jest
      .spyOn(bankAccountRepository, 'getAll')
      .mockImplementation(() => Promise.resolve([]));
    const mockPageableGetPages = jest
      .spyOn(pageable, 'getPages')
      .mockImplementation(() => new Pager());

    await bankAccountController.getAll(new Pages());

    expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    expect(mockBankAccountRepositoryGetAll).toBeCalledTimes(1);
    expect(mockPageableGetPages).toBeCalledTimes(1);
  });

  it('getOneMe - Should throw not found exception', () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await bankAccountController.getOneMe("dummy-account-id");
      expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOneMe - Should return bank account', async () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockBankAccountRepositoryGetOne = jest
      .spyOn(bankAccountRepository, 'getOne')
      .mockImplementation(() => Promise.resolve(new BankAccount()));

    await bankAccountController.getOneMe("dummy-account-id");

    expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    expect(mockBankAccountRepositoryGetOne).toBeCalledTimes(1);
  });

  it('getOne - Should throw not found exception', () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await bankAccountController.getOne("dummy-account-id");
      expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('getOne - Should return bank account', async () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockBankAccountRepositoryGetOne = jest
      .spyOn(bankAccountRepository, 'getOne')
      .mockImplementation(() => Promise.resolve(new BankAccount()));

    await bankAccountController.getOne("dummy-account-id");

    expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    expect(mockBankAccountRepositoryGetOne).toBeCalledTimes(1);
  });

  it('create - Should create bank account', async () => {
    const mockBankAccountRepositoryCreate = jest
      .spyOn(bankAccountRepository, 'create')
      .mockImplementation(() => Promise.resolve(new BankAccount()));

    await bankAccountController.create("dummy-user-id", new BankAccountCreatorSkeleton());

    expect(mockBankAccountRepositoryCreate).toBeCalledTimes(1);
  });

  it('deleteOne - Should throw not found exception', () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await bankAccountController.deleteOne("dummy-account-id");
      expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('deleteOne - Should delete bank account', async () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockBankAccountRepositoryDeleteOne = jest
      .spyOn(bankAccountRepository, 'deleteOne')
      .mockImplementation(() => Promise.resolve());

    await bankAccountController.deleteOne("dummy-account-id");
    
    expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    expect(mockBankAccountRepositoryDeleteOne).toBeCalledTimes(1);
  });

  it('deleteOneMe - Should throw not found exception', () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(0));

    expect(async () => {
      await bankAccountController.deleteOneMe("dummy-user-id");
      expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    })
    .rejects
    .toThrow(NotFoundException);
  });

  it('deleteOneMe - Should delete bank account', async () => {
    const mockBankAccountRepositoryCount = jest
      .spyOn(bankAccountRepository, 'count')
      .mockImplementation(() => Promise.resolve(1));
    const mockBankAccountRepositoryDeleteOne = jest
      .spyOn(bankAccountRepository, 'deleteOne')
      .mockImplementation(() => Promise.resolve());

    await bankAccountController.deleteOneMe("dummy-user-id");
    
    expect(mockBankAccountRepositoryCount).toBeCalledTimes(1);
    expect(mockBankAccountRepositoryDeleteOne).toBeCalledTimes(1);
  });
});
