# AWS Library
---

## S3
1. Import
```javascript
const {S3} = require('nsus/s3'); 
```
2. Initialize
```javascript
const s3 = new S3({
    accessKeyId: <access-key-id>,
    secretAccessKey: <secret-access-key>,
    region: <region>,
    bucketName: <bucket-name>
});

```
3. Upload method
```javascript
await s3.upload({
    fileName: '<file-name>',
    data: <bytes>,
    metaData: {} // optional
});
```
4. Download method
```javascript
const result = await s3.download({
    fileName: '<file-name>'
});
```