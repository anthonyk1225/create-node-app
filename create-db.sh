#!/bin/bash
cd ./lib
../node_modules/.bin/sequelize db:create
NODE_ENV="test" ../node_modules/.bin/sequelize db:create
exit 0
