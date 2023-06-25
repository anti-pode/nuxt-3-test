import { Ref } from 'vue/dist/vue';

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type ICommentCreate = Pick<IComment, 'body' | 'postId' | 'name' | 'email'>;

export type ICommentUpdate = Pick<IComment, 'body'>;

export interface ICommentsService {
  get(postId: Ref<number | string> | number | string): Promise<IComment[]>;
  update(
    postId: Ref<number | string> | number | string,
    id: Ref<number | string> | number | string,
    data: ICommentUpdate
  ): Promise<IComment>;
  create(data: ICommentCreate): Promise<IComment>;
  delete(id: Ref<number | string> | number | string): Promise<null>;
}
