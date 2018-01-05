#!/bin/bash
cd ./lib
../node_modules/.bin/sequelize db:drop
NODE_ENV="test" ../node_modules/.bin/sequelize db:drop
exit 0
