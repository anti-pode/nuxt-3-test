import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { SorterResult, IPost, IPostCreate, IPostGetPayload, IPostUpdate, SortOrder } from './posts.types';
import { IAdapterService, IPostsService, Methods, TYPES } from '@/shared/api';

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

    if (payload.sort?.value) {
      const { _sort, _order } = this.formatSort(payload.sort);

      query._sort = _sort;
      query._order = _order;
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

  private formatSort = (
    sort: Ref<SorterResult | SorterResult[] | null>
  ): { _sort: string; _order: 'desc' | 'asc' | '' } => {
    if (!sort.value) return { _sort: '', _order: '' };

    const sortArray = Array.isArray(sort.value) ? sort.value : [sort.value];

    return sortArray.reduce(
      (acc, { columnKey, order }) => {
        if (columnKey && order) {
          acc._sort += acc._sort ? `,${String(columnKey)}` : String(columnKey);
          acc._order += acc._order ? `,${SortOrder[order]}` : SortOrder[order];
        }

        return acc;
      },
      { _sort: '', _order: '' } as { _sort: string; _order: 'desc' | 'asc' | '' }
    );
  };
}

export { PostsService };
