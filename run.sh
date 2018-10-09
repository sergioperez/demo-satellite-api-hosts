#!/bin/bash
if [ "$#" == "" ] || [ "$1" == "" ] || [ "$2" == "" ] || [ "$3" == "" ]
then 
  echo "Bad syntax. Use: ./run.sh SATELLITE_URL username password"
  echo "    Example: ./run.sh https://satellite.myorg.com"
  exit
fi

SATELLITE_URL=$1
USERNAME=$2
PASSWORD=$3
CREDENTIALS=$(echo -n "${USERNAME}:${PASSWORD}" | base64)

nodemon --experimental-modules index.mjs $SATELLITE_URL $CREDENTIALS
