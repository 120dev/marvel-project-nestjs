import { CacheService } from './cache.service';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    cacheService = new CacheService();
  });

  describe('get', () => {
    it('should return the value for a given key if the file exists', async () => {
      const mockData = JSON.stringify({ testKey: 'testValue' });
      (fs.readFile as jest.Mock).mockResolvedValue(mockData);

      const result = await cacheService.get('testKey');

      expect(fs.readFile).toHaveBeenCalledWith(expect.any(String), 'utf8');
      expect(result).toBe('testValue');
    });

    it('should return undefined if the key does not exist', async () => {
      const mockData = JSON.stringify({ anotherKey: 'anotherValue' });
      (fs.readFile as jest.Mock).mockResolvedValue(mockData);

      const result = await cacheService.get('nonExistingKey');

      expect(result).toBeUndefined();
    });

    it('should initialize the cache file if it does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const result = await cacheService.get('anyKey');

      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        '{}',
        'utf8'
      );
      expect(result).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should write the key and value to the cache file', async () => {
      const mockData = JSON.stringify({ existingKey: 'existingValue' });
      (fs.readFile as jest.Mock).mockResolvedValue(mockData);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await cacheService.set('newKey', 'newValue');

      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(
          { existingKey: 'existingValue', newKey: 'newValue' },
          null,
          2
        ),
        'utf8'
      );
    });
  });
});
