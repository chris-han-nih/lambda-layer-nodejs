const MYSQL2 = require('mysql2/promise');

class Mysql {
    #pool;
    #isDebug = false;

    constructor(conf) {
        if (!conf) throw 'invalid DB configuration.';

        if (typeof conf.isDebug === 'string') {
            this.#isDebug = conf.isDebug.toUpperCase() === 'DEBUG';
        } else if (typeof conf.isDebug === 'boolean') {
            this.#isDebug = conf.isDebug;
        }

        if (this.#pool) {
            if (this.#isDebug === true) console.debug('is connected');
            return this;
        }
        this.#pool = MYSQL2.createPool({
            host: conf.host,
            user: conf.user,
            password: conf.password,
            database: conf.schema ?? conf.database,
            waitForConnections: true,
            connectionLimit: conf.connectionLimit ?? 100,
            queueLimit: 0,
            namedPlaceholders: true
        });

        return this;
    }

    close() {
        this.#pool.end();
        this.#pool = null;
    }

    async first({query, param = null}) {
        const {ok, data} = await this.#execute(query, param);

        if (!ok || !data[0]) return {ok: false};

        return {ok: ok, data: data[0]};
    }

    async find({query, param = null}) {
        return await this.#execute(query, param);
    }

    async command({query, param}) {
        return await this.#execute(query, param);
    }

    async #execute(query, param) {
        try {
            const result = param ? await this.#pool.query(query, param) : await this.#pool.query(query);
            if (this.#isDebug === true)
                console.debug(`query: ${query}, param: ${JSON.stringify(param)}, result ${JSON.stringify(result)}`);

            return {ok: true, data: result[0]};
        } catch (err) {
            console.error(`${err}, Query: ${query}, Param: ${JSON.stringify(param)}`);

            return {ok: false, data: err};
        }
    }
}

module.exports = {Mysql};
