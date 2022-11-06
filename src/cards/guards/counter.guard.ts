import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CardRepository } from '../card.repository';
import { MAXIMUM_CARDS } from '../constants/card.constant';

export class CardQuantityGuard implements CanActivate {
  @Inject(CardRepository)
  private readonly cardRepository: CardRepository;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const userId = headers['user-id'];

    if (!userId) throw new UnauthorizedException('No user id');

    const counter = await this.cardRepository.count({ customerId: userId });

    if (counter >= MAXIMUM_CARDS) {
      throw new ConflictException('The maximum number of cards is 3');
    }

    return true;
  }
}
