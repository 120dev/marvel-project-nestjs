import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should return hello message when getHello is called', () => {
    const result = 'Hello World!';
    jest.spyOn(appService, 'getHello').mockImplementation(() => result);

    expect(appController.getHello()).toBe(result);
  });

  it('should handle error when service throws error while fetching hello message', () => {
    jest.spyOn(appService, 'getHello').mockImplementation(() => {
      throw new Error();
    });

    expect(() => appController.getHello()).toThrow();
  });
});
