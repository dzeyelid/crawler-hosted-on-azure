"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
class Crawler {
    crawl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrive the title and the content from the specified URL.
            try {
                const response = yield axios_1.default.get(url);
                const $ = cheerio.load(response.data);
                const title = $('title').text();
                const body = $('body').text();
                const page = {
                    url: url,
                    title,
                    content: body,
                };
                return page;
            }
            catch (e) {
                // Failed to retrive from the specified URL.
                return false;
            }
        });
    }
}
exports.Crawler = Crawler;
//# sourceMappingURL=index.js.map