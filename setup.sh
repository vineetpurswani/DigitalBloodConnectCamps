#!/bin/bash

# Make sure only root can run our script
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [OPTIONS]
OPTIONS
	setup - build docker image
	start - run docker image
	stop - stop docker image
	delete - delete docker image"
    exit 1
fi

if [ "$1" == "setup" ]; then
	docker build -t bloodconnect/node-web-app .
elif [ "$1" == "start" ]; then
	docker run -p 8000:3000 -d bloodconnect/node-web-app
elif [ "$1" == "stop" ]; then
	docker rm $(docker stop $(docker ps -q --filter ancestor=bloodconnect/node-web-app))
#elif [ "$1" == "delete" ]; then
#	docker rmi $(docker images -q --filter ancestor=bloodconnect/node-web-app)
else
	echo "Invalid option."
fi
