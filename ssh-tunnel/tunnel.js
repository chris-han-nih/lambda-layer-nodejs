const tunnel = require('tunnel-ssh');

class Tunnel {
    static #conf;
    constructor(conf) {
        Tunnel.#conf = conf;
        return this;
    }

    connection() {
        return tunnel(Tunnel.#conf, (error, server) => {
            if (error){
                console.error('SSH connection failed ', error);
                return;
            }
            if (server === null) {
                console.error('SSH server is null');
            }
        });
    }
}

module.exports = {Tunnel}
