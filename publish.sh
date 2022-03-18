#!/bin/bash

PROD_NAME=$1
DESCRIPTION=$2

echo $'\360\237\232\252' + 'Move to package directory'
cd $PROD_NAME

if [ -f "package.json" ]; then
  /bin/rm -rf node_modules
  echo $'\342\232\231' + 'Install node package'
  npm install
fi

echo $'\360\237\223\213' + 'Packaging lambda layer package'
/bin/mkdir -p nsus && /bin/cp *.js nsus/
/bin/mv nsus node_modules/
/bin/mkdir nodejs && /bin/mv node_modules nodejs/

/usr/bin/zip nodejs.zip -r nodejs

echo $'\342\217\261' + 'Publish package to lambda layer'
aws lambda publish-layer-version --layer-name $PROD_NAME --description "$DESCRIPTION" --zip-file fileb://nodejs.zip --compatible-runtimes nodejs14.x

echo $'\360\237\227\221' + 'Clean up directory and file'
/bin/rm -rf nodejs
/bin/rm nodejs.zip
