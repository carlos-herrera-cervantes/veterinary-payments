import { Module } from '@nestjs/common';
import { ClassicPageable } from './classic-pageable.implementation';

@Module({
  providers: [ClassicPageable],
  exports: [ClassicPageable],
})
export class PagerModule {}
