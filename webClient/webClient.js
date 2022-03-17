const AXIOS = require('axios');

class WebClient {
    constructor(conf) {
        this.client = AXIOS.create(conf);

        return this;
    }

    async get({ path, param }) {
        try {
            const res = param ?
                await this.client.httpClient.get(path) :
                await this.client.httpClient.get(`${path}?${this.genParam(param)}`);
            return res;
        } catch (err) {
            throw err;
        }
    }

    async post({ path, body, param = null }) {
        try {
            const res = param ?
                await this.client.httpClient.post(path, body) :
                await this.client.httpClient.post(`${path}?${ths.genParam(param)}`, body);
            
            return res;
        } catch (err) {
            throw err;
        }
    }

    genParam(param) {
        let result;
        let index = 0;
        for (const [k, v] of Object.entries(param)) {
            result += index === 0 ? `${k}=${v}` : `&${k}=${v}`;
        }

        return result;
    }
}

module.exports = { WebClient }