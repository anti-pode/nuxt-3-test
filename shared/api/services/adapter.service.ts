import { injectable, inject } from 'inversify';
import { TYPES } from '~/shared/api/types/types';
import { ILoggerService } from '~/shared/api/services/logger.service';

const DEFAULT_REQUEST: Pick<Request, 'cache' | 'headers'> = {
  cache: 'no-cache',
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

interface IRequestWrapper {
  request: Omit<Partial<Request>, 'body'> & { body?: BodyInit };
  param?: string;
  query?: { [key: string]: string | number };
  description?: string;
  data?: unknown;
}

interface IRequest extends IRequestWrapper {
  // TODO: типизировать
  resolvePayload(response: Response): Promise<any>;
}

export interface IAdapterService {
  subdirectory: string;

  requestJSON<T>(payload: IRequestWrapper): Promise<T>;
}

@injectable()
export default class AdapterService implements IAdapterService {
  subdirectory = '';
  private readonly API_BASE_URL;
  readonly logger;

  constructor(@inject(TYPES.Logger) logger: ILoggerService) {
    this.logger = logger;

    const config = useRuntimeConfig();
    this.API_BASE_URL = config.public.apiBaseURL;
  }

  // TODO: добавить другие методы обработки запросов
  requestJSON<T>(payload: IRequestWrapper): Promise<T> {
    const { request, param, query, description, data } = payload;

    return this.request<T>({
      request: {
        ...DEFAULT_REQUEST,
        ...request,
        body: JSON.stringify(data),
      },
      param,
      query,
      description,
      resolvePayload: (response: Response) => response.json(),
    });
  }

  private async request<T>(payload: IRequest): Promise<T> {
    const { request, param, query, description, resolvePayload } = payload;
    const endpoint = this.buildEndpoint(param, query);

    let response: Response;
    try {
      response = await fetch(endpoint, request);

      if (!response.ok) {
        this.logger.warn(
          `${request.method} | '${description}' завершился с ошибкой, статус ${response.status} / ${response.statusText}`
        );
      } else {
        this.logger.log(`${request.method} | ${description} успешно завершен`);
      }

      return await resolvePayload(response);
    } catch (e) {
      this.logger.error(`${request.method} | '${description}' failed, ${e}`);

      return Promise.reject(new Error('Произошла непредвиденная ошибка'));
    }
  }

  private buildEndpoint(param?: string, query?: { [key: string]: string | number }): string {
    let endpoint = this.API_BASE_URL + this.subdirectory;

    if (param) {
      endpoint += `/${param}`;
    }

    if (query) {
      endpoint += `?${new URLSearchParams(this.makeQueryString(query))}`;
    }

    return endpoint;
  }

  private makeQueryString(query: { [key: string]: string | number }): { [key: string]: string } {
    return Object.entries(query).reduce((acc, [key, value]) => {
      acc[key] = String(value);

      return acc;
    }, {} as { [key: string]: string });
  }
}
