#!/bin/bash

# deploy.sh
#
# Command to copy a directory to the correct location on the Development or production servers.
# Also attempts to create the containing directory on the server first.



[ $# -lt 3 ] && { echo "Deploy Usage:"; echo "deploy <ACE Username> <web01|web03> <Directory to Upload>"; exit 1; }

SSH_USER=$1
SUBDOMAIN=$2
DEPLOY_DIRECTORY=$3

ACTIVITY_NAME="SusiePhipps"
COURSE_PREFIX="WMST"
COURSE_NUMBER="WMST113"


if [ "$SUBDOMAIN" = "web03" ]
then
DEV="dev."
fi

CONNECTION_STRING="${SSH_USER}@${SUBDOMAIN}.online.unlv.edu"
PATH="/srv/www/${DEV}courses.online.unlv.edu/courses/${COURSE_PREFIX}/${COURSE_NUMBER}/${ACTIVITY_NAME}"

echo -e "...Deploying '\033[1m$DEPLOY_DIRECTORY\033[0m'"
echo -e "...to '\033[1m$CONNECTION_STRING\033[0m'"
echo -e "...at path '\033[1m$PATH\033[0m'"
echo;
echo -e "Does this look correct? \033[1m(y/n)\033[0m"
read prompt
if [ "$prompt" != "y" ]
then
  echo "Exiting..."
  exit 1;
fi

echo "Creating directory if necessary..."
/usr/bin/ssh $CONNECTION_STRING " mkdir -p $PATH"
echo "Copying directory contents..."
/usr/bin/rsync --rsh="/usr/bin/ssh" -aP --delete "${DEPLOY_DIRECTORY}" $CONNECTION_STRING:$PATH
