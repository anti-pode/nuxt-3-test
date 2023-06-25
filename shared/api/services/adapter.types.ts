import { Ref } from 'vue';

export interface IRequestWrapper {
  request: Omit<Partial<Request>, 'body'> & { body?: BodyInit };
  param?: Ref<string | number> | string | number;
  query?: { [key: string]: Ref<string | number> | string | number };
  description?: string;
  data?: unknown;
}

export interface IRequest extends IRequestWrapper {
  // TODO: типизировать
  resolvePayload(response: Response): Promise<any>;
}

export interface IAdapterService {
  subdirectory: string;

  requestJSON<T>(payload: Partial<IRequestWrapper>): Promise<T>;
}
