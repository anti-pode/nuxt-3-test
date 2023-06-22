import { inject, injectable } from 'inversify';

import { TYPES } from '@/shared/api/types/types';
import { IAdapterService } from '~/shared/api/services/adapter.service';

export interface IPostsService {
  get(): any; // TODO: типизировать
}

// TODO: добавить остальные методы, доработать get

@injectable()
export default class PostsService implements IPostsService {
  private readonly name = 'posts';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;

    adapter.subdirectory = `${this.name}/`;
  }

  async get() {
    return await this.adapter.requestJSON({
      request: {
        method: 'GET',
      },
      description: 'Получение постов',
    });
  }
}
