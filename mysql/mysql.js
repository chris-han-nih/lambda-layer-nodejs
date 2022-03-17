const MYSQL2 = require('Mysql2/promise');

class Mysql {
    static #pool;
    static #isDebug;

    constructor({host, user, password, schema, isDebug = false, connectionLimit = 100}) {
        Mysql.#isDebug = isDebug;
        if (Mysql.#pool) {
            if (Mysql.#isDebug === true) console.log('[DEBUG] is connected');
            return this;
        }
        Mysql.#pool = MYSQL2.createPool({
            host: host,
            user: user,
            password: password,
            database: schema,
            waitForConnections: true,
            connectionLimit: connectionLimit,
            queueLimit: 0,
            namedPlaceholders: true
        });

        return this;
    }

    async first({query, param = null}) {
        const result = await this.#execute(query, param);

        if (!result.isOk) return {isOk: result.isOk};

        return {isOk: result.isOk, data: result.data[0]};
    }

    async find({query, param = null}) {
        return await this.#execute(query, param);
    }

    async command({query, param}) {
        return await this.#execute(query, param);
    }

    async #execute(query, param) {
        try {
            const result = param ? await Mysql.#pool.query(query, param) : await Mysql.#pool.query(query);
            if (Mysql.#isDebug === true) console.log(`[DEBUG] query: ${query}, param: ${param}, result ${JSON.stringify(result[0])}`);

            return {isOk: true, data: result[0]};
        } catch (err) {
            console.log(`${err}, Query: ${query}, Param: ${JSON.stringify(param)}`);

            return {isOk: false, data: err};
        }
    }
}

module.exports = {Mysql};