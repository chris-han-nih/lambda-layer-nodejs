const AWS = require('aws-sdk');

class S3 {
    constructor({accessKeyId, secretAccessKey, region, bucketName}) {
        this.s3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region
        });
        this.bucket = bucketName;
    }

    async upload({fileName, data, metaData = null}) {
        try {
            await this.s3.upload({
                Bucket: this.bucket,
                Key: fileName,
                Body: data,
                Metadata: metaData
            }).promise();
        } catch (err) {
            throw err;
        }
    }

    async download({fileName}) {
        try {
            return await this.s3.getObject({
                Bucket: this.bucket,
                Key: fileName
            }).promise();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {S3}
