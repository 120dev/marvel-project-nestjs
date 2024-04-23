import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarvelApiService } from './marvel-api.service';
import { CacheModule } from '../cache/cache.module';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [HttpModule, CacheModule],
  providers: [MarvelApiService, CacheService],
  exports: [MarvelApiService],
})
export class MarvelApiModule {}
