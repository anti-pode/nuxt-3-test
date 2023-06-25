import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { IPost, IPostCreate, IPostGetPayload, IPostUpdate } from './posts.types';
import { IPostsService, IAdapterService, TYPES, Methods } from '@/shared/api';

@injectable()
class PostsService implements IPostsService {
  private readonly name = 'posts';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;
  }

  async get(payload: IPostGetPayload): Promise<IPost[]> {
    const query: { [key: string]: Ref<string | number> | string | number } = {
      _page: payload.page,
      _limit: payload.limit,
    };

    if (payload.filter?.value) {
      const [dataIndex, value] = this.formatFilter(payload.filter);

      query[dataIndex] = value;
    }

    return await this.adapter.requestJSON<IPost[]>({
      subdirectory: this.name,
      description: 'Получение постов',
      query,
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
        method: Methods.PUT,
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
        method: Methods.POST,
      },
      description: 'Создание поста',
      data,
    });
  }

  async delete(id: Ref<number | string> | number | string): Promise<null> {
    return await this.adapter.requestIgnoreResponse({
      subdirectory: this.name,
      request: {
        method: Methods.DELETE,
      },
      description: 'Удаление поста',
      param: id,
    });
  }

  private formatFilter = (filter: Ref<[string, string] | null>): [string, string] => {
    if (!(filter.value && filter.value[0] && filter.value[1])) return ['', ''];

    const [dataIndex, value] = filter.value;

    return [`${dataIndex}_like`, value];
  };
}

export { PostsService };
