import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';

/**
 * SeriesQueryParamsMiddleware is a middleware that validates the query parameters
 * for the series requests and stores them in the cache.
 */
@Injectable()
export class SeriesQueryParamsMiddleware implements NestMiddleware {
  /**
   * Constructs the SeriesQueryParamsMiddleware.
   * @param {CacheService} cacheService - The service to manage cache.
   */
  constructor(private readonly cacheService: CacheService) {}

  /**
   * Validates the query parameters and stores them in the cache.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   * @throws {HttpException} - If the query parameters are missing.
   */
  async use(req: Request, res: Response, next: NextFunction) {
    const { ts, apikey, hash } = req.query;

    if (!ts || !apikey || !hash) {
      throw new HttpException('Missing parameters', HttpStatus.NOT_FOUND);
    }

    await this.cacheService.set(
      'auth',
      `ts=${ts}&apikey=${apikey}&hash=${hash}`
    );

    next();
  }
}
