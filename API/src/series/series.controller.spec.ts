import { Test, TestingModule } from '@nestjs/testing';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';

describe('SeriesController', () => {
  let controller: SeriesController;
  let seriesService: SeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriesController],
      providers: [
        {
          provide: SeriesService,
          useValue: {
            getAllSeries: jest.fn((endpoint: string) =>
              Promise.resolve(`Mocked ${endpoint}`)
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<SeriesController>(SeriesController);
    seriesService = module.get<SeriesService>(SeriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSeries', () => {
    it('should return all series', async () => {
      expect(await controller.getAllSeries()).toBe('Mocked series');
      expect(seriesService.getAllSeries).toHaveBeenCalledWith('series');
    });
  });

  describe('getAllSerieComics', () => {
    it('should return all comics for a specific serie', async () => {
      const id = '123';
      expect(await controller.getAllSerieCommics(id)).toBe(
        'Mocked series/123/comics'
      );
      expect(seriesService.getAllSeries).toHaveBeenCalledWith(
        `series/${id}/comics`
      );
    });
  });
});
