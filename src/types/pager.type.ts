import { IsNumber } from 'class-validator';

export class Pager<T> {
  totalDocs: number;
  data: T[];
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export class Pages {
  @IsNumber() 
  offset: number = 0;

  @IsNumber()
  limit: number = 10;
}
