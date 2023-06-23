import { injectable, inject } from 'inversify';
import { IPostsService } from '~/shared/api/services/posts.service';
import { TYPES } from '~/shared/api/types/types';
import { ICommentsService } from '~/shared/api/services/comments.service';

export interface IApiService {
  readonly postsAPI: IPostsService;
  readonly commentsAPI: ICommentsService;
}

@injectable()
export default class ApiService implements IApiService {
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
