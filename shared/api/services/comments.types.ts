import { Ref } from 'vue/dist/vue';

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type ICommentCreate = Pick<IComment, 'body' | 'postId' | 'name' | 'email'>;

export interface ICommentsService {
  get(postId: Ref<number | string> | number | string): Promise<IComment[]>;
  create(data: ICommentCreate): Promise<IComment>;
  delete(id: Ref<number | string> | number | string): Promise<null>;
}
