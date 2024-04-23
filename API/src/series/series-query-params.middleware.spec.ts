import { SeriesQueryParamsMiddleware } from './series-query-params.middleware';
import { HttpException } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

describe('SeriesQueryParamsMiddleware', () => {
  let middleware: SeriesQueryParamsMiddleware;
  let mockCacheService: CacheService;
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    // Mocking CacheService
    mockCacheService = { set: jest.fn() } as unknown as CacheService;

    // Mocking request and response objects
    mockRequest = {
      query: {},
    };
    mockResponse = {};
    nextFunction = jest.fn();

    // Create an instance of the middleware
    middleware = new SeriesQueryParamsMiddleware(mockCacheService);
  });

  it('should throw an HttpException if required query params are missing', async () => {
    try {
      await middleware.use(mockRequest, mockResponse, nextFunction);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toBe('Missing parameters');
      expect(error.status).toBe(404);
    }
  });

  it('should call next() if all required query params are present', async () => {
    mockRequest.query = { ts: 'timestamp', apikey: 'key', hash: 'hash' };

    await middleware.use(mockRequest, mockResponse, nextFunction);

    expect(mockCacheService.set).toHaveBeenCalledWith(
      'auth',
      'ts=timestamp&apikey=key&hash=hash'
    );
    expect(nextFunction).toHaveBeenCalled();
  });
});
