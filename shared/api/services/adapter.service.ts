import { injectable, inject } from 'inversify';
import { Ref } from 'vue';
import { IRequest, IRequestWrapper, Methods } from './adapter.types';
import { ILoggerService, IAdapterService, TYPES } from '@/shared/api';

const DEFAULT_REQUEST: Pick<Request, 'cache' | 'headers'> = {
  cache: 'no-cache',
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@injectable()
class AdapterService implements IAdapterService {
  private readonly API_BASE_URL;
  readonly logger;

  constructor(@inject(TYPES.Logger) logger: ILoggerService) {
    this.logger = logger;

    const config = useRuntimeConfig();
    this.API_BASE_URL = config.public.apiBaseURL;
  }

  requestJSON<T>(payload: Partial<IRequestWrapper> & { subdirectory: string }): Promise<T> {
    const { request, param, query, description, data, subdirectory } = payload;

    return this.request<T>({
      request: {
        ...DEFAULT_REQUEST,
        ...request,
        method: request?.method ?? Methods.GET,
        body: JSON.stringify(data),
      },
      subdirectory,
      param,
      query,
      description,
      resolvePayload: <T>(response: Response) => response.json() as Promise<T>,
    });
  }

  requestIgnoreResponse(payload: Partial<IRequestWrapper> & { subdirectory: string }): Promise<null> {
    const { request, param, query, description, data, subdirectory } = payload;

    return this.request<null>({
      request: {
        ...DEFAULT_REQUEST,
        ...request,
        method: request?.method ?? Methods.GET,
        body: JSON.stringify(data),
      },
      subdirectory,
      param,
      query,
      description,
      resolvePayload: <T>(_response: Response) => Promise.resolve(null) as Promise<T>,
    });
  }

  private async request<T>(payload: IRequest): Promise<T> {
    const { request, param, query, description, subdirectory, resolvePayload } = payload;
    const endpoint = this.buildEndpoint(subdirectory, param, query);

    let response: Response;
    try {
      response = await fetch(endpoint, request);

      if (response.ok) {
        this.logger.log(`${request.method} | ${description} успешно завершено`);
      } else {
        this.logger.error(
          `${request.method} | '${description}' завершился с ошибкой, статус ${response.status} / ${response.statusText}`
        );
      }

      return await resolvePayload(response);
    } catch (e) {
      this.logger.error(`${request.method} | '${description}' завершился с ошибкой, ${e}`);

      // TODO: добавить обработку ошибок
      return Promise.reject(new Error('Произошла непредвиденная ошибка'));
    }
  }

  private buildEndpoint(
    subdirectory: string,
    param?: Ref<string | number> | string | number,
    query?: { [key: string]: Ref<string | number> | string | number }
  ): string {
    let endpoint = this.API_BASE_URL + subdirectory;

    if (param) {
      endpoint += `/${String(isRef(param) ? param.value : param)}`;
    }

    if (query) {
      endpoint += `?${new URLSearchParams(this.makeQueryString(query)).toString().replace(/%2C/g, ',')}`;
    }

    return endpoint;
  }

  private makeQueryString(query: { [key: string]: Ref<string | number> | string | number }): { [key: string]: string } {
    return Object.entries(query).reduce((acc, [key, value]) => {
      acc[key] = String(isRef(value) ? value.value : value);

      return acc;
    }, {} as { [key: string]: string });
  }
}

export { AdapterService };
