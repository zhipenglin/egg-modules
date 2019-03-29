const {renderToString} = require('react-dom/server'),
    {createElement} = require('react'),
    fs = require('fs'),
    {ChunkExtractor} = require('@loadable/server'),
    path = require('path');

module.exports = {
    async reactRender(data = {}, target = '') {
        let webExtractor;
        if (this.app.config.env === 'local') {
            const {data: webExtractorData} = await this.curl(`${this.staticServer}${this.app.config.reactRender.webExtractor}`);
            webExtractor = new ChunkExtractor({stats: JSON.parse(webExtractorData.toString())});
        } else {
            webExtractor = new ChunkExtractor({statsFile: path.resolve(this.app.config.static.dir, target, this.app.config.reactRender.webExtractor)});
        }

        const context = {};
        let html = '', pageData = {};

        const statsFilePath = path.resolve(this.app.config.static.dir, target, this.app.config.reactRender.extractor);

        if (this.app.config.env !== 'local' || fs.existsSync(statsFilePath)) {
            const extractor = new ChunkExtractor({statsFile: statsFilePath});
            const {default: App, fetchPageData} = extractor.requireEntrypoint();

            if (fetchPageData && typeof fetchPageData === 'function') {
                try {
                    pageData = await fetchPageData({url: this.req.url, origin: this.request.origin});
                    Object.assign(data, {__page_data: pageData});
                } catch (e) {
                    this.app.logger.error(e);
                }
            }

            const jsx = webExtractor.collectChunks(createElement(App, {
                url: this.req.url, context, data
            }));

            try {
                html = renderToString(jsx);
            } catch (e) {
                this.app.logger.error(e);
            }
        }


        if (context.url) {
            await this.redirect(context.url);
        }

        return {
            __PAGE_DATA: pageData,
            __SERVER_RENDER_HTML: html,
            __LINK_TAGS: webExtractor.getLinkTags(),
            __STYLE_TAGS: webExtractor.getStyleTags(),
            __SCRIPT_TAGS: webExtractor.getScriptTags()
        };
    }
};
