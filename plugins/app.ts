import 'reflect-metadata';
import { ContainerModule, interfaces, Container } from 'inversify';

import { TYPES } from '@/shared/api/types/types';
import AppService from '@/shared/api/services/app.service';
import LoggerService from '@/shared/api/services/logger.service';
import ApiService from '@/shared/api/services/api.service';
import PostsService from '@/shared/api/services/posts.service';
import AdapterService from '@/shared/api/services/adapter.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind(TYPES.Application).to(AppService).inSingletonScope();
  bind(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind(TYPES.API).to(ApiService).inSingletonScope();
  bind(TYPES.Adapter).to(AdapterService).inSingletonScope();
  bind(TYPES.PostsAPIModule).to(PostsService).inSingletonScope();
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
