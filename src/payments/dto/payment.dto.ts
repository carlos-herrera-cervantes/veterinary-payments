import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class PaymentCreatorSkeleton {
  @IsNotEmpty()
  @IsMongoId()
  paymentMethodId: string;

  @IsOptional()
  @IsMongoId()
  cardId?: string;

  @IsNotEmpty()
  @IsMongoId()
  serviceId: string;

  @IsOptional()
  logRequest?: string;

  @IsOptional()
  logResponse?: string;
}
