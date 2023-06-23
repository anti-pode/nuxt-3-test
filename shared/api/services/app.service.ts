import { inject, injectable } from 'inversify';
import { TYPES } from '@/shared/api/types/types';
import { ILoggerService } from '@/shared/api/services/logger.service';
import { IApiService } from '~/shared/api/services/api.service';

interface IAppService {
  readonly logger: ILoggerService;

  init(): void;
}

@injectable()
export default class AppService implements IAppService {
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
