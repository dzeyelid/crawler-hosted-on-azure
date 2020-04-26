import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

import { Crawler } from '../src';

describe('Crawl', () => {
  test.todo('Found');
  test('Not found', async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject());
    const url = 'https://example.com';
    const crawler = new Crawler();
    const result = await crawler.crawl(url);
    expect(result).toBe(false);
  });
});
