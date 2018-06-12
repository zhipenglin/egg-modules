const minimatch = require("minimatch");

module.exports=(urlPath, open, urls) => {
    if (!open) {
        return false;
    }
    if (typeof urls === 'string') {
        if (urls === '*') {
            return true;
        }
        if (minimatch(urlPath, urls)) {
            return true;
        }
    }

    if (Array.isArray(urls)) {
        for (let url of urls) {
            if(minimatch(urlPath, url)) return true;
        }
    }

    return false;

};
