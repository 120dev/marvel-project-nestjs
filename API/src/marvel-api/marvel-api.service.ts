import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CacheService } from '../cache/cache.service';

/**
 * MarvelApiService is a service that handles the logic related to fetching data from the Marvel API.
 * It uses the HttpService for making HTTP requests and the CacheService for caching.
 */
@Injectable()
export class MarvelApiService {
  /**
   * The base URL of the Marvel API.
   * @private
   */
  private baseUrl: string = 'http://gateway.marvel.com/v1/public';

  /**
   * Constructs the MarvelApiService.
   * @param {HttpService} httpService - The service to make HTTP requests.
   * @param {CacheService} cache - The service to manage cache.
   */
  constructor(
    private httpService: HttpService,
    private readonly cache: CacheService
  ) {}

  /**
   * Fetches data from a specific endpoint of the Marvel API.
   * @param {string} endpoint - The endpoint to fetch data from.
   * @returns {Promise<any>} - A promise that resolves to the data from the Marvel API.
   */
  async fetch(endpoint: string): Promise<any> {
    const auth = await this.cache.get('auth');
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${endpoint}?${auth}`)
    );
    return response.data;
  }
}
