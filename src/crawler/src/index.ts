import { Page } from './interfaces/page.interface';
import axios from 'axios';
import * as cheerio from 'cheerio';

class Crawler {
  async crawl(url: string): Promise<Page | false> {
    // Retrive the title and the content from the specified URL.
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const title = $('title').text();
      const body = $('body').text();
  
      const page: Page = {
        url: url,
        title,
        content: body,
      };
      return page;
    } catch (e) {
      // Failed to retrive from the specified URL.
      return false;
    }
  }
}

export { Crawler, Page };