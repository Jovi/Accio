/**
 * to be added
 * error handler
 */

import { Runtime } from './runtime.js';
import { Cache } from './cache.js';
import { Fetch } from './fetch.js';

async function Accio (key, url) {
    try {
        const runtime = new Runtime(key);
        const runtimeIns = runtime.get();
        if (runtimeIns) {
            return runtimeIns;
        }

        const cache = new Cache(key);
        const cacheCode = cache.get();
        if (cacheCode) {
            runtime.set(cacheCode);
            return runtime.get();
        }

        const fetch = new Fetch(url);
        const fetchCode = await fetch.get();
        if (fetchCode) {
            cache.set(fetchCode); 
            runtime.set(fetchCode);           
            return runtime.get();
        }
    } catch (err) {
        console.log(err);
    }
}

Accio.all = async (opt, cb) => {
    if (cb) {
        try {
            const res = await Wand(opt);
            cb(res);
        } catch (err) {
            console.error(err);
        }
    } else {
        return Wand(opt);
    }
    

    async function Wand (opt) {
        try {
            const listKey = Object.keys(opt);
            const listAccio = listKey.map(key => Accio(key, opt[key]));
            const listInstance = await Promise.all(listAccio);

            const pkgs = {};
            listKey.forEach((key, index) => {
                pkgs[key] = listInstance[index];
            });
            return pkgs;
        } catch (err) {
            console.error(err);
        }
    }
}

window.Accio = Accio;

export default Accio;
