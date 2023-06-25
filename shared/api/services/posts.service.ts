import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { IPost, IPostCreate, IPostUpdate } from './posts.types';
import { IPostsService, IAdapterService, TYPES } from '@/shared/api';

// TODO: добавить остальные методы

const POSTS_PAGE_LIMIT = 2;

@injectable()
class PostsService implements IPostsService {
  private readonly name = 'posts';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;
  }

  async getPage(page: Ref<number> | number): Promise<IPost[]> {
    return await this.adapter.requestJSON<IPost[]>({
      subdirectory: this.name,
      description: 'Получение постов',
      query: {
        _page: page,
        _limit: POSTS_PAGE_LIMIT,
      },
    });
  }

  async getById(id: Ref<number | string> | number | string): Promise<IPost> {
    return await this.adapter.requestJSON<IPost>({
      subdirectory: this.name,
      description: 'Получение поста',
      param: id,
    });
  }

  async update(id: Ref<number | string> | number | string, data: IPostUpdate): Promise<IPost> {
    return await this.adapter.requestJSON<IPost>({
      subdirectory: this.name,
      request: {
        method: 'PUT',
      },
      description: 'Редактирование поста',
      param: id,
      data,
    });
  }

  async create(data: IPostCreate): Promise<IPost> {
    return await this.adapter.requestJSON<IPost>({
      subdirectory: this.name,
      request: {
        method: 'POST',
      },
      description: 'Создание поста',
      data,
    });
  }
}

export { PostsService };
