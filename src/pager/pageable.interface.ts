import { Pager } from 'src/types/pager.type';

export interface IPageable<T> {
  getPages(docs: T[], totalDocs: number, offset: number, limit: number): Pager<T>;
}
