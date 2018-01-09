#!/bin/bash
cd ./lib
../node_modules/.bin/sequelize db:migrate
NODE_ENV="test" ../node_modules/.bin/sequelize db:migrate
exit 0
