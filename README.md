# AWS Lambda layer

## Deploy
1. js 파일을 `node_modules` 하위로 복사,
2. node_modules 파일을 `nodejs`(중요) 하위로 복사한다.
3. nodejs 폴더를 압축
4. 배포

```bash
$ aws lambda publish-layer-version --layer-name <layer-name> \
  --description "description" --zip-file fileb://nodejs.zip \
  --compatible-runtimes nodejs14.x --region <region>
  
 $ ./publish.sh <library-directory> <description>
 $ ./publish.sh mysql 'mysql nodejs library (named, positional parameter 겸용'
```

