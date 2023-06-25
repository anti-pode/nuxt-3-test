import { inject, injectable } from 'inversify';

import { Ref } from 'vue';
import { IComment, ICommentsService, IAdapterService, TYPES } from '~/shared/api';

// TODO: добавить остальные методы

@injectable()
class CommentsService implements ICommentsService {
  // private readonly name = 'comments';
  private adapter;

  constructor(@inject(TYPES.Adapter) adapter: IAdapterService) {
    this.adapter = adapter;

    // TODO: поправить перезатирание поддириктории
    // adapter.subdirectory = `${this.name}/`;
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

export { CommentsService };
