import { Ref } from 'vue/dist/vue';

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ICommentsService {
  get(postId: Ref<number | string> | number | string): Promise<IComment[]>;
}
