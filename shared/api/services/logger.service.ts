/* eslint-disable no-console */

import { injectable } from 'inversify';
import { availableConsoleTypes } from './logger.types';
import { ILoggerService } from '@/shared/api';

@injectable()
class LoggerService implements ILoggerService {
  readonly isProdMode;

  constructor() {
    const config = useRuntimeConfig();

    this.isProdMode = config.public.isProdMode;
  }

  log(value: availableConsoleTypes, ...rest: availableConsoleTypes[]): void {
    if (!this.isProdMode) {
      console.log(value, ...rest);
    }
  }

  error(error: availableConsoleTypes): void {
    if (!this.isProdMode) {
      console.error(error);
    }
  }

  warn(value: availableConsoleTypes, ...rest: availableConsoleTypes[]): void {
    if (!this.isProdMode) {
      console.warn(value, ...rest);
    }
  }
}

export { LoggerService };

/* eslint-enable no-console */
