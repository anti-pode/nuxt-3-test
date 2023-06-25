import { inject, injectable } from 'inversify';
import { ILoggerService, IApiService, IAppService, TYPES } from '@/shared/api';

@injectable()
class AppService implements IAppService {
  readonly logger;
  readonly api;

  constructor(@inject(TYPES.Logger) logger: ILoggerService, @inject(TYPES.API) api: IApiService) {
    this.logger = logger;
    this.api = api;
  }

  init() {
    this.logger.log('Контейнер приложения запущен');
  }
}

export { AppService };
