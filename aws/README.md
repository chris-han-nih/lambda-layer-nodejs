# AWS Library
---

## S3
#### 1. Import
```javascript
const {S3} = require('nsus/s3'); 
```
#### 2. Initialize
```javascript
const s3 = new S3({
    accessKeyId: 'ASDF-..',
    secretAccessKey: 'ADF123-...',
    region: 'ap-east-1',
});
```
no|prop|desc
----|----|----
1|accessKeyId|s3 bucket access 권한이 있는 IAM key id
2|secretAccessKey|s3 bucket access secret key
3|region|s3 bucket region

#### 3. Upload method
```javascript
await s3.upload({
    bucketName: '<bucket-name>',
    fileName: '<file-name>',
    data: data,
    metaData: {} 
});
```
no| prop       |desc
----|------------|----
1| bucketName |s3 bucket access 권한이 있는 IAM key id
2| fileName   |s3 bucket access secret key
3|data|upload file data
4|metaData| upload file 메타 데이터이고 Optional이다

#### 4.Download method
```javascript
const result = await s3.download({
    bucketName: '<bucket-name>',
    fileName: '<file-name>'
});
```
---
## Secret
#### 1. Import
```javascript
const {Secret} = require('nsus/secret'); 
```
#### 2. Example
```javascript
const con = await Secret.getSecret({
    secretName: 'prd/romania/rds',
    region: 'ap-east-1'
});
```

