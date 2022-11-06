import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagerModule } from '../pager/pager.module';
import { DevolutionController } from './devolution.controller';
import { DevolutionRepository } from './devolution.repository';
import { Devolution, DevolutionSchema } from './schemas/devolution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Devolution.name, schema: DevolutionSchema },
    ]),
    PagerModule,
  ],
  providers: [DevolutionRepository],
  controllers: [DevolutionController],
})
export class DevolutionModule {}
