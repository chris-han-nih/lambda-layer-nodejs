const AWS = require('aws-sdk');

class S3 {
    constructor({accessKeyId, secretAccessKey, region}) {
        this.s3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region
        });
    }

    async upload({bucketName, fileName, data, metaData = null}) {
        try {
            await this.s3.upload({
                Bucket: bucketName,
                Key: fileName,
                Body: data,
                Metadata: metaData
            }).promise();
        } catch (err) {
            throw err;
        }
    }

    async download({bucketName, fileName}) {
        try {
            return await this.s3.getObject({
                Bucket: bucketName,
                Key: fileName
            }).promise();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {S3}
