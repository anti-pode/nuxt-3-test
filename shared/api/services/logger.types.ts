export type availableConsoleTypes = string | number;

export interface ILoggerService {
  readonly isProdMode: boolean;

  log(value: availableConsoleTypes, ...rest: availableConsoleTypes[]): void;
  error(error: availableConsoleTypes): void;
  warn(value: availableConsoleTypes, ...rest: availableConsoleTypes[]): void;
}
