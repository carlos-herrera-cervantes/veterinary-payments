import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PaymentMethodCreatorSkeleton {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class PaymentMethodUpdaterSkeleton extends PartialType(PaymentMethodCreatorSkeleton) {}
