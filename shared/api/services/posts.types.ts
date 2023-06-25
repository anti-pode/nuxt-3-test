import { Ref } from 'vue/dist/vue';

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
  sort?: { [key: string]: 'desc' | 'asc' };
  filter?: Ref<[string, string] | null>;
};

export interface IPostsService {
  get(payload: IPostGetPayload): Promise<IPost[]>;
  getById(id: Ref<number | string> | number | string): Promise<IPost>;
  update(id: Ref<number | string> | number | string, data: IPostUpdate): Promise<IPost>;
  create(data: IPostCreate): Promise<IPost>;
  delete(id: Ref<number | string> | number | string): Promise<null>;
}
