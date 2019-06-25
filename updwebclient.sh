#!/bin/bash

cd /var/www/webclient/

sudo rm -rf web && sudo rm -rf node_modules && sudo git pull 

sudo npm install && sudo npm run build
