// test/main.spec.ts
import { INestApplication } from '@nestjs/common';
import { bootstrap } from './main';

describe('Application bootstrap', () => {
  let app: INestApplication;

  it('should start and then close the application', async () => {
    app = await bootstrap();
    expect(app).toBeDefined();
    await app.close();
  });
});
