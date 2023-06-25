import { Ref } from 'vue';

export interface IRequestWrapper {
  subdirectory: string;
  request: Omit<Partial<Request>, 'body'> & { body?: BodyInit };
  param?: Ref<string | number> | string | number;
  query?: { [key: string]: Ref<string | number> | string | number };
  description?: string;
  data?: unknown;
}

export interface IRequest extends IRequestWrapper {
  resolvePayload<T>(response: Response): Promise<T>;
}

export interface IAdapterService {
  requestJSON<T>(payload: Partial<IRequestWrapper> & { subdirectory: string }): Promise<T>;
  requestIgnoreResponse(payload: Partial<IRequestWrapper> & { subdirectory: string }): Promise<null>;
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
