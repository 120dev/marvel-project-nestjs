import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

/**
 * Interface for the content of the cache.
 */
interface CacheContent {
  [key: string]: any;
}

/**
 * CacheService is a service that handles the logic related to caching.
 * It uses the file system to read and write the cache file.
 */
@Injectable()
export class CacheService {
  /**
   * The path to the cache file.
   * @private
   */
  private readonly cacheFilePath = join(__dirname, '..', 'cache.json');

  /**
   * Fetches a value from the cache.
   * @param {string} key - The key of the value to fetch.
   * @returns {Promise<any>} - A promise that resolves to the value from the cache.
   */
  async get(key: string): Promise<any> {
    const data = await this.readCacheFile();
    return data[key];
  }

  /**
   * Sets a value in the cache.
   * @param {string} key - The key of the value to set.
   * @param {any} value - The value to set.
   * @returns {Promise<void>} - A promise that resolves when the value has been set.
   */
  async set(key: string, value: any): Promise<void> {
    const data = await this.readCacheFile();
    data[key] = value;
    await this.writeCacheFile(data);
  }

  /**
   * Reads the cache file.
   * @private
   * @returns {Promise<CacheContent>} - A promise that resolves to the content of the cache file.
   */
  private async readCacheFile(): Promise<CacheContent> {
    try {
      const data = await fs.readFile(this.cacheFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // The file does not exist, so create it with an empty object
        await this.writeCacheFile({});
        return {};
      } else {
        throw error;
      }
    }
  }

  /**
   * Writes to the cache file.
   * @private
   * @param {CacheContent} data - The data to write to the cache file.
   * @returns {Promise<void>} - A promise that resolves when the data has been written to the cache file.
   */
  private async writeCacheFile(data: CacheContent): Promise<void> {
    await fs.writeFile(
      this.cacheFilePath,
      JSON.stringify(data, null, 2),
      'utf8'
    );
  }
}
