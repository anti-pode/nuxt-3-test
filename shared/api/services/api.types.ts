import { IPostsService, ICommentsService } from '@/shared/api';

export interface IApiService {
  readonly postsAPI: IPostsService;
  readonly commentsAPI: ICommentsService;
}
