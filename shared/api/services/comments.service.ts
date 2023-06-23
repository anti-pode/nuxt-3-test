import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { TYPES } from '@/shared/api/types/types';
import { IAdapterService } from '~/shared/api/services/adapter.service';

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ICommentsService {
  get(postId: Ref<number> | number): Promise<IComment[]>;
}

// TODO: добавить остальные методы

@injectable()
export default class CommentsService implements ICommentsService {
  private readonly name = 'comments';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;

    adapter.subdirectory = `${this.name}/`;
  }

  async get(postId: Ref<number> | number): Promise<IComment[]> {
    return await this.adapter.requestJSON<IComment[]>({
      description: 'Получение комментариев',
      query: {
        postId,
        _limit: 5,
      },
    });
  }
}
