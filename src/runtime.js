/**
 * Inpired by https://github.com/ruanyf/tiny-browser-require
 * 
 * 
 * to be added:
 * UMD
 *
 */

export class Runtime {
    constructor(key) {
        this.key = key;

        this.RT = this.getRT();
    }

    getRT() {
        const rtObj = '__ACCIO_RUNTIME__';

        if (!window[rtObj]) {
            window[rtObj] = {};
        }

        return window[rtObj];
    }

    get() {
        const mod = this.RT[this.key];
        if (!mod) return null;
        if (!mod.exports) {
            mod.exports = {};
            mod.call(mod.exports, mod, mod.exports);
        }
        return mod.exports;
    }

    set(code) {
        this.RT[this.key] = new Function('module', 'exports', 'require', code);
    }
}
