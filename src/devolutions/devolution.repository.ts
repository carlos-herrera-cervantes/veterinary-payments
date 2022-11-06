import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { DevolutionCreatorSkeleton, DevolutionUpdaterSkeleton } from './dto/devolution.dto';
import { Devolution, DevolutionDocument } from './schemas/devolution.schema';

@Injectable()
export class DevolutionRepository {
  @InjectModel(Devolution.name)
  private readonly devolutionModel: Model<DevolutionDocument>;

  async getAll(filter?: FilterQuery<Devolution>, offset = 0, limit = 10): Promise<Devolution[]> {
    return this.devolutionModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset * limit)
      .limit(limit);
  }

  async count(filter?: FilterQuery<Devolution>): Promise<number> {
    return this.devolutionModel.countDocuments(filter);
  }

  async getOne(filter?: FilterQuery<Devolution>): Promise<Devolution> {
    return this.devolutionModel.findOne(filter);
  }

  async create(devolution: DevolutionCreatorSkeleton): Promise<Devolution> {
    return this.devolutionModel.create(devolution);
  }

  async updateOne(filter: FilterQuery<Devolution>, devolution: DevolutionUpdaterSkeleton): Promise<Devolution> {
    return this.devolutionModel.findOneAndUpdate(filter, { $set: devolution }, { new: true });
  }

  async deleteOne(filter?: FilterQuery<Devolution>): Promise<void> {
    await this.devolutionModel.deleteOne(filter);
  }
}
