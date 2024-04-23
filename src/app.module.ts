import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MarvelModule } from './marvel/marvel.module';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [ItemsModule, MarvelModule, SeriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
