const AWS = require('aws-sdk');

class Secret {
    static async getSecret({secretName, region}){
        const secretsManager = new AWS.SecretsManager({region: region});

        try {
            const secretValue = await secretsManager.getSecretValue({SecretId: secretName}).promise();

            if ('SecretString' in secretValue) {
                return JSON.parse(secretValue.SecretString);
            }

            const buff = new Buffer(secretValue.SecretBinary, 'base64');
            return JSON.parse(buff.toString('ascii'));
        } catch (err) {
            throw err
        }
    }
}

module.exports = {Secret}
