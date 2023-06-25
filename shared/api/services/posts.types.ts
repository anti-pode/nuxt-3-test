import { Ref } from 'vue/dist/vue';
import { SorterResult } from 'ant-design-vue/lib/table/interface';

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type IPostUpdate = Pick<IPost, 'title' | 'body'>;

export type IPostCreate = Pick<IPost, 'title' | 'body' | 'userId'>;

export type IPostGetPayload = {
  page: Ref<number | string> | number | string;
  limit: Ref<number | string> | number | string;
  sort?: Ref<SorterResult | SorterResult[] | null>;
  filter?: Ref<[string, string] | null>;
};

export enum SortOrder {
  'ascend' = 'asc',
  'descend' = 'desc',
}

export interface IPostsService {
  get(payload: IPostGetPayload): Promise<IPost[]>;
  getById(id: Ref<number | string> | number | string): Promise<IPost>;
  update(id: Ref<number | string> | number | string, data: IPostUpdate): Promise<IPost>;
  create(data: IPostCreate): Promise<IPost>;
  delete(id: Ref<number | string> | number | string): Promise<null>;
}
