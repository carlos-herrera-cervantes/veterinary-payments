import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BankAccountCreatorSkeleton {
  @IsOptional()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  clabe: string;
}
