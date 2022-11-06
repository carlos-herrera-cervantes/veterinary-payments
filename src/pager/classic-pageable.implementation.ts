import { Injectable } from '@nestjs/common';
import { Pager } from '../types/pager.type';
import { IPageable } from './pageable.interface';

@Injectable()
export class ClassicPageable<T> implements IPageable<T> {
  getPages(docs: T[], totalDocs: number, offset: number, limit: number): Pager<T> {
    const pager = new Pager<T>();
    const skip = offset * limit;

    pager.hasNext = (skip + limit) < totalDocs;
    pager.hasPrevious = !(offset == 0);
    pager.totalDocs = totalDocs;
    pager.data = docs;
    pager.page = offset;
    pager.pageSize = limit;

    return pager;
  }
}
