const staticServer = require('../../lib/staticServer');

module.exports = {
    staticServer: staticServer,
    async renderVirtual(data = {}) {
        const res = await this.curl(staticServer);
        try {
            return await this.renderString(res.data.toString(), data);
        } catch (e) {
            return res.data.toString();
        }
    }
}
