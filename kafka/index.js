const {Kafka, CompressionTypes} = require('kafkajs');

class KafkaProducer {
    #topic = null;
    #producer = null;

    constructor(conf) {
        this.#topic = conf.topic;
        this.#producer = (new Kafka({
            brokers: conf.brokers,
            clientId: conf.clientId,
            ssl: {
                rejectUnauthorized: true
            },
            sasl: {
                mechanism: 'SCRAM-SHA-512',
                username: 'staging_msk',
                password: 'staging_msk!@',
            }
        })).producer();
    }

    async connect() {
        await this.#producer.connect();
    }

    async sendMessage(msg, topic) {
        if (!KafkaProducer.#isValidTopic(topic, this.#topic)) {
            return {ok: false, error: 'topic can not be null or empty'}
        }

        return this.#producer.send({
            topic: this.#topic ?? topic,
            compression: CompressionTypes.GZIP,
            messages: msg
        }).then(() => {
            return {ok: true}
        }).catch(e => {
            return {ok: false, error: e};
        });
    }

    static #isValidTopic(param, field) {
        return (param && param.trim() !== '') || (field && field.trim() !== '');
    }
}