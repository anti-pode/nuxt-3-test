import { injectable, inject } from 'inversify';
import { ICommentsService, IApiService, IPostsService, TYPES } from '@/shared/api';

@injectable()
class ApiService implements IApiService {
  readonly postsAPI;
  readonly commentsAPI;

  constructor(
    @inject(TYPES.PostsAPIModule) postsAPI: IPostsService,
    @inject(TYPES.CommentsAPIModule) commentsAPI: ICommentsService
  ) {
    this.postsAPI = postsAPI;
    this.commentsAPI = commentsAPI;
  }
}

export { ApiService };
