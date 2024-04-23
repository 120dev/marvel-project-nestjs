import { Controller, Get, Param } from '@nestjs/common';
import { SeriesService } from './series.service';

/**
 * SeriesController is a controller that handles HTTP requests related to series.
 * It uses the SeriesService to fetch data.
 */
@Controller('series')
export class SeriesController {
  /**
   * Constructs the SeriesController.
   * @param {SeriesService} seriesService - The service to fetch series data.
   */
  constructor(private readonly seriesService: SeriesService) {}

  /**
   * Handles GET requests to fetch all series.
   * @returns {Promise} - A promise that resolves to the data of all series.
   */
  @Get()
  async getAllSeries() {
    return await this.seriesService.getAllSeries('series');
  }

  /**
   * Handles GET requests to fetch all comics of a specific series.
   * @param {string} id - The ID of the series.
   * @returns {Promise} - A promise that resolves to the data of all comics of the specified series.
   */
  @Get(':id/comics')
  async getAllSerieCommics(@Param('id') id: string) {
    return await this.seriesService.getAllSeries(`series/${id}/comics`);
  }
}
