/* eslint-disable no-console */

import { injectable } from 'inversify';

type availableConsoleTypes = string | number;

export interface ILoggerService {
  readonly isProdMode: boolean;

  log(value: availableConsoleTypes, ...rest: availableConsoleTypes[]): void;
  error(error: availableConsoleTypes): void;
  warn(value: availableConsoleTypes, ...rest: availableConsoleTypes[]): void;
}

@injectable()
export default class LoggerService implements ILoggerService {
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

/* eslint-enable no-console */
