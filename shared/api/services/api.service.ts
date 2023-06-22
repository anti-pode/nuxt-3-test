import { injectable, inject } from 'inversify';
import { IPostsService } from '~/shared/api/services/posts.service';
import { TYPES } from '~/shared/api/types/types';

export interface IApiService {
  readonly postsAPI: IPostsService;

  // readonly commentsAPI: any; // TODO: добавить сервис для комментов
}

@injectable()
export default class ApiService implements IApiService {
  readonly postsAPI;
  // readonly commentsAPI;

  constructor(@inject(TYPES.PostsAPIModule) postsAPI: IPostsService) {
    this.postsAPI = postsAPI;
  }
}
