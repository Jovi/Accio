/**
 * to be added:
 * url verify
 * fetch-timeout
 * backup-url
 */

import 'whatwg-fetch';

export class Fetch {
    constructor(url) {
        this.urlList = [];
        this.handleUrl(url);
    }

    handleUrl(url) {
        if (url.constructor === String) {
            this.addUrl(url);
        } else if (url.constructor === Array) {
            url.forEach(e => this.addUrl(e));
        }
    }

    addUrl(url) {
        this.urlList.push(url);
    }

    async get() {
        return await fetch(this.urlList.shift()).then((response) => response.text());
    }
}
