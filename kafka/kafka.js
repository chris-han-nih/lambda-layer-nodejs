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
                mechanism: conf.mechanism,
                username: conf.username,
                password: conf.password,
            }
        })).producer().connect();
    }

    async sendMessage(msg, topic) {
        if (!KafkaProducer.#isValidTopic(topic, this.#topic)) {
            throw 'topic can not be null or empty';
        }
        if (!msg) {
            throw 'msg is required';
        }

        return this.#producer.send({
            topic: this.#topic ?? topic,
            compression: CompressionTypes.GZIP,
            messages: Array(msg).map(_ => KafkaProducer.#createMessage(msg, topic))
        }).then(() => {
            return {ok: true}
        }).catch(e => {
            return {ok: false, error: e};
        });
    }

	static #createMessage(msg) {
        return {
            key: msg.key ?? '',
            value: JSON.stringify(msg.value)
        }
	}

    static #isValidTopic(param, field) {
        return (param && param.trim() !== '') || (field && field.trim() !== '');
    }
}

module.exports = { KafkaProducer }
