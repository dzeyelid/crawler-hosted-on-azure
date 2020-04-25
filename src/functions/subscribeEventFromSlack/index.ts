import * as df from "durable-functions"
import { IHttpResponse } from "durable-functions/lib/src/classes"
import { AzureFunction, Context, HttpRequest } from "../node_modules/@azure/functions"
import { Crawler } from "crawler"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('HTTP trigger function processed a request.');
    if (!validate(req)) {
        context.log('The event is not eligible.');
        const response: IHttpResponse = {
            status: 200,
            body: null
        }
        return response;
    }

    // Respond to challenge request
    if (req.body.hasOwnProperty('challenge')) {
        context.log('Just respond to the verify.');
        const response: IHttpResponse = {
            status: 200,
            body: {
                challenge: req.body.challenge
            }
        }
        return response;
    }

    // Extract the urls
    const { blocks } = req.body.event;
    const richTextBlocks = blocks.filter(block => block.type === 'rich_text');
    const urls = richTextBlocks.map(block => {
        const richTextSectionElements = block.elements.filter(text => text.type === 'rich_text_section');
        return richTextSectionElements.map(element => {
            const links = element.elements.filter(element => element.type === 'link');
            return links.map(link => link.url);
        });
    }).flat(2);

    if (urls.length) {
        const client = df.getClient(context);
        const instanceId = await client.startNew('orchestrator', undefined, urls);
        return client.createCheckStatusResponse(context.bindingData.req, instanceId);
    }

    context.log('The event does not include urls.');
    const response: IHttpResponse = {
        status: 200,
        body: null
    }
    return response;
};

const validate = (req:HttpRequest): boolean => {
    if (!req.body || !req.body.event) {
        return false;
    }

    if (!req.body.event.type || req.body.event.type !== 'message') {
        return false;
    }

    if (!req.body.event.blocks || req.body.event.blocks.length === 0) {
        return false;
    }

    return true;
}

export default httpTrigger;