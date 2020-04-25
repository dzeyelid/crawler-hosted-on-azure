import { Page } from './interfaces/page.interface';
declare class Crawler {
    crawl(url: string): Promise<Page | false>;
}
export { Crawler, Page };
