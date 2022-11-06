import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { BankAccountCreatorSkeleton } from './dto/bank-account.dto';
import { BankAccount, BankAccountDocument } from './schemas/bank-account.schema';

@Injectable()
export class BankAccountRepository {
  @InjectModel(BankAccount.name)
  private readonly bankAccountModel: Model<BankAccountDocument>;

  async getAll(filter?: FilterQuery<BankAccount>, offset = 0, limit = 10): Promise<BankAccount[]> {
    return this.bankAccountModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset * limit)
      .limit(limit);
  }

  async getOne(filter?: FilterQuery<BankAccount>): Promise<BankAccount> {
    return this.bankAccountModel.findOne(filter).lean();
  }

  async count(filter?: FilterQuery<BankAccount>): Promise<number> {
    return this.bankAccountModel.countDocuments(filter);
  }

  async create(account: BankAccountCreatorSkeleton): Promise<BankAccount> {
    return this.bankAccountModel.create(account);
  }

  async deleteOne(filter?: FilterQuery<BankAccount>): Promise<void> {
    await this.bankAccountModel.deleteOne(filter);
  }
}
