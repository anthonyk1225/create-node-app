#!/bin/bash
forever start -a -l forever.log -o create-node-app.out.log -e create-node-app.err.log server.js --presets es2015
#exit 0
