import {
  Controller,
  Get,
  Inject,
  Query,
  Headers,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Patch
} from '@nestjs/common';
import { ClassicPageable } from '../pager/classic-pageable.implementation';
import { IPageable } from '../pager/pageable.interface';
import { Pager, Pages } from '../types/pager.type';
import { DevolutionRepository } from './devolution.repository';
import { DevolutionCreatorSkeleton, DevolutionUpdaterSkeleton } from './dto/devolution.dto';
import { Devolution } from './schemas/devolution.schema';

@Controller('api/payments/v1/devolutions')
export class DevolutionController {
  @Inject(DevolutionRepository)
  private readonly devolutionRepository: DevolutionRepository;

  @Inject(ClassicPageable<Devolution>)
  private readonly pageable: IPageable<Devolution>;

  @Get()
  async getAll(@Query() pages: Pages): Promise<Pager<Devolution>> {
    const { offset, limit } = pages;
    const [totalDocs, docs] = await Promise.all([
      this.devolutionRepository.count(),
      this.devolutionRepository.getAll({}, offset, limit)
    ]);

    return this.pageable.getPages(docs, totalDocs, offset, limit);
  }

  @Get('me')
  async getAllMe(@Headers('user-id') userId: string, @Query() pages: Pages): Promise<Pager<Devolution>> {
    const { offset, limit } = pages;
    const [totalDocs, docs] = await Promise.all([
      this.devolutionRepository.count({ customerId: userId }),
      this.devolutionRepository.getAll({ customerId: userId }, offset, limit)
    ]);

    return this.pageable.getPages(docs, totalDocs, offset, limit);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Devolution> {
    const counter = await this.devolutionRepository.count({ _id: id });

    if (!counter) throw new NotFoundException('Devolution not found');

    return this.devolutionRepository.getOne({ _id: id });
  }

  @Get('me/:id')
  async getOneMe(@Headers('user-id') userId: string, @Param('id') id: string): Promise<Devolution> {
    const counter = await this.devolutionRepository.count({ customerId: userId, _id: id });

    if (!counter) throw new NotFoundException('Devolution not found');

    return this.devolutionRepository.getOne({ customerId: userId, _id: id });
  }

  @Post()
  async create(@Body() devolution: DevolutionCreatorSkeleton): Promise<Devolution> {
    return this.devolutionRepository.create(devolution);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() devolution: DevolutionUpdaterSkeleton): Promise<Devolution> {
    return this.devolutionRepository.updateOne({ _id: id }, devolution);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string): Promise<void> {
    const counter = await this.devolutionRepository.count({ _id: id });

    if (!counter) throw new NotFoundException('Devolution not found');

    await this.devolutionRepository.deleteOne({ _id: id });
  }
}
