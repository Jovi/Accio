/**
 * to be added:
 * cache verify against XSS
 * CacheStorage API
 */

const KEY_PREFIX = '__ACCIO_CACHE__';

export class Cache {
    constructor(key) {
        this.key = `${KEY_PREFIX}${key}`;
    }

    get() {
        return localStorage[this.key];
    }

    set(code) {
        localStorage[this.key] = code;
    }
}
