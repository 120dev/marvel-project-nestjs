import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from './series.service';
import { MarvelApiService } from '../marvel-api/marvel-api.service';

describe('SeriesService', () => {
  let service: SeriesService;
  let marvelApiService: MarvelApiService;

  beforeEach(async () => {
    // Création d'un module de test qui inclut le SeriesService et un mock pour MarvelApiService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        {
          provide: MarvelApiService,
          useValue: {
            fetch: jest.fn((path: string) =>
              Promise.resolve(`Mocked fetch for ${path}`)
            ),
          },
        },
      ],
    }).compile();

    service = module.get<SeriesService>(SeriesService);
    marvelApiService = module.get<MarvelApiService>(MarvelApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSeries', () => {
    it('should return a promise that resolves to data', async () => {
      const path = 'series';
      const result = await service.getAllSeries(path);
      expect(result).toBe('Mocked fetch for series');
      expect(marvelApiService.fetch).toHaveBeenCalledWith(path);
    });
  });
});
