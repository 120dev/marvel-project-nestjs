import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    // Attempt to create a TestingModule based on AppModule
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should properly initialize all declared modules', () => {
    // Ensure that AppModule and all its dependencies are resolved
    const appModule = module.get<AppModule>(AppModule);
    expect(appModule).toBeInstanceOf(AppModule);
  });
});
