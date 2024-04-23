import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { MarvelApiService } from './marvel-api.service';
import { CacheService } from '../cache/cache.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('MarvelApiService', () => {
  let service: MarvelApiService;
  let httpService: HttpService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarvelApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MarvelApiService>(MarvelApiService);
    httpService = module.get<HttpService>(HttpService);
    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    it('should retrieve data using HTTP GET with authentication from cache', async () => {
      const endpoint = 'characters';
      const authParams = 'ts=1&apikey=key&hash=hash';
      const mockData = { data: 'Marvel character data' };
      const response: AxiosResponse = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {}, // This is the only necessary mention of headers.
        config: {
          url: 'URL',
          method: 'get',
          headers: undefined,
        },
        request: {},
      };

      jest.spyOn(cacheService, 'get').mockResolvedValue(authParams);
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      const result = await service.fetch(endpoint);

      expect(cacheService.get).toHaveBeenCalledWith('auth');
      expect(httpService.get).toHaveBeenCalledWith(
        `http://gateway.marvel.com/v1/public/${endpoint}?${authParams}`
      );
      expect(result).toEqual(mockData);
    });
  });
});
