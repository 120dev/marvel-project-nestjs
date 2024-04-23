import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeriesModule } from './series/series.module';
import { MarvelApiModule } from './marvel-api/marvel-api.module';
import { CacheService } from './cache/cache.service';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [SeriesModule, MarvelApiModule, CacheModule],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
