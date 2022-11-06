import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class DevolutionCreatorSkeleton {
  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsOptional()
  customerId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  comment: string;
}

export class DevolutionUpdaterSkeleton extends PartialType(DevolutionCreatorSkeleton) {}
