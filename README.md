# AWS Lambda layer

> AWS Lambda에 사용할 기능을 Layer로 배포하여 사용할 수 있도록 구현

### List
- aws : S3 Upload/Download 기능과, SecretsManager로 관리되고 있는 내용 조회 기능 
- kafka : Kafka producer
- mysql : Named/Positional parameter 지원
- parser : csv2json, json2csv, xml2json
- segment : analytics-node module

### Deploy
> 배포는 AWS CLI Credential를 설정하고 프로젝트에 포함된 shell script를 사용하여 진행할 수 있다.

```bash
 $ ./publish.sh <library-directory> <description>
 # library-directory : 필수 항목이고, 배포후 layer이름으로 사용된다.
 # description : 선택 항목이고, 배포 버전에서 추가되거나 변경된 내용을 적으면 된다.
 $ ./publish.sh mysql 'mysql nodejs library (named, positional parameter 겸용)'
```

