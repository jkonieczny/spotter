#!/bin/sh
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd -P`
DIR="$SCRIPTPATH"

DIST=$DIR/public
REGION="eu-west-1"
BUCKET="app.spotter.online"
TARGET="s3://$BUCKET/"

echo "Deploying from: '$DIR' to $TARGET"
aws --profile=spotter s3 sync $DIST $TARGET
