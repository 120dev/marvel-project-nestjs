import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { HttpModule } from '@nestjs/axios';
import { MarvelApiModule } from '../marvel-api/marvel-api.module';
import { SeriesQueryParamsMiddleware } from './series-query-params.middleware';
import { CacheModule } from '../cache/cache.module';
import { CacheService } from '../cache/cache.service';

/**
 * SeriesModule is a module that provides the setup for the series feature of the application.
 * It imports necessary modules, declares the controller and providers, and configures the middleware.
 */
@Module({
  imports: [HttpModule, MarvelApiModule, CacheModule],
  controllers: [SeriesController],
  providers: [SeriesService, CacheService],
})
export class SeriesModule {
  /**
   * Configures the middleware for the routes of the series feature.
   * @param {MiddlewareConsumer} consumer - The middleware consumer to apply the middleware.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SeriesQueryParamsMiddleware)
      .forRoutes(
        { path: 'series', method: RequestMethod.ALL },
        { path: 'series/:id/comics', method: RequestMethod.ALL }
      );
  }
}
