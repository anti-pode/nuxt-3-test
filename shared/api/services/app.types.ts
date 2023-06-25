import { ILoggerService } from '@/shared/api';

export interface IAppService {
  readonly logger: ILoggerService;

  init(): void;
}
