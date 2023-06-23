import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { TYPES } from '@/shared/api/types/types';
import { IAdapterService } from '~/shared/api/services/adapter.service';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostsService {
  getPage(page: Ref<number> | number): Promise<IPost[]>;
}

// TODO: добавить остальные методы

const POSTS_PAGE_LIMIT = 2;

@injectable()
export default class PostsService implements IPostsService {
  private readonly name = 'posts';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;

    adapter.subdirectory = `${this.name}/`;
  }

  async getPage(page: Ref<number> | number): Promise<IPost[]> {
    return await this.adapter.requestJSON<IPost[]>({
      description: 'Получение постов',
      query: {
        _page: page,
        _limit: POSTS_PAGE_LIMIT,
      },
    });
  }
}
