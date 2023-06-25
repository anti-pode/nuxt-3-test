import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { ICommentCreate } from './comments.types';
import { IComment, ICommentsService, IAdapterService, TYPES, Methods } from '~/shared/api';

// TODO: добавить остальные методы

@injectable()
class CommentsService implements ICommentsService {
  private readonly name = 'comments';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;
  }

  async get(postId: Ref<number | string> | number | string): Promise<IComment[]> {
    return await this.adapter.requestJSON<IComment[]>({
      subdirectory: this.name,
      description: 'Получение комментариев',
      query: {
        postId,
        _sort: 'id',
        _order: 'desc',
      },
    });
  }

  async create(data: ICommentCreate): Promise<IComment> {
    return await this.adapter.requestJSON<IComment>({
      subdirectory: this.name,
      request: {
        method: Methods.POST,
      },
      description: 'Создание комментария',
      data,
    });
  }

  async delete(id: Ref<number | string> | number | string): Promise<null> {
    return await this.adapter.requestIgnoreResponse({
      subdirectory: this.name,
      request: {
        method: Methods.DELETE,
      },
      description: 'Удаление комментария',
      param: id,
    });
  }
}

export { CommentsService };
