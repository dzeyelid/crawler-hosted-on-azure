/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

import { AzureFunction, Context } from "@azure/functions";
import { Crawler, Page } from 'crawler';
import { Parser } from 'json2csv';

const activityFunction: AzureFunction = async function (context: Context): Promise<Page | false> {
    // Retrieve the title and the content from the specified url
    const crawler = new Crawler();
    const result = await crawler.crawl(context.bindings.url);

    // Convert from JSON to CSV
    const fields = ['title', 'url', 'content'];
    const options = { fields };
    const parser = new Parser(options);
    const csv = parser.parse(result);
    context.bindings.dataStorage = csv;

    return result;
};

export default activityFunction;
