import 'reflect-metadata';
import { ContainerModule, interfaces, Container } from 'inversify';

import {
  TYPES,
  AppService,
  LoggerService,
  ApiService,
  PostsService,
  AdapterService,
  CommentsService,
} from '@/shared/api';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind(TYPES.Application).to(AppService).inSingletonScope();
  bind(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind(TYPES.API).to(ApiService).inSingletonScope();
  bind(TYPES.Adapter).to(AdapterService).inSingletonScope();
  bind(TYPES.PostsAPIModule).to(PostsService).inSingletonScope();
  bind(TYPES.CommentsAPIModule).to(CommentsService).inSingletonScope();
});

export default defineNuxtPlugin({
  name: 'app',
  setup() {
    const appContainer = new Container();
    appContainer.load(appBindings);

    const app = appContainer.get<AppService>(TYPES.Application);
    app.init();

    return {
      provide: {
        app,
      },
    };
  },
});
