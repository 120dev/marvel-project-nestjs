import { Injectable } from '@nestjs/common';
import { MarvelApiService } from '../marvel-api/marvel-api.service';

/**
 * SeriesService is a service that handles the logic related to series.
 * It uses the MarvelApiService to fetch data.
 */
@Injectable()
export class SeriesService {
  /**
   * Constructs the SeriesService.
   * @param {MarvelApiService} marvelApiService - The service to fetch Marvel API data.
   */
  constructor(private marvelApiService: MarvelApiService) {}

  /**
   * Fetches all series from the Marvel API.
   * @param {string} path - The path to fetch data from the Marvel API.
   * @returns {Promise<any>} - A promise that resolves to the data of all series.
   */
  async getAllSeries(path: string): Promise<any> {
    return await this.marvelApiService.fetch(path);
  }
}
