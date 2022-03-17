#!/bin/bash

cd $1

/bin/mkdir -p nsus

/bin/cp *.js nsus/

/bin/cp nsus/* node_modules/

/bin/mkdir nodejs

/bin/cp node_modules/* nodejs/

/usr/bin/zip nodejs.zip -r nodejs

aws lambda publish-layer-version --layer-name $1 --description "$2" --zip-file fileb://nodejs.zip --compatible-runtimes nodejs14.x

/bin/rm -rf nsus

/bin/rm -rf nodejs

/bin/rm nodejs.zip
