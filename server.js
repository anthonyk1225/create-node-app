'use strict';
const express = require('express');
const app = module.exports = express();
const port = process.env.PORT || 8080;

// Set up configuration
app.config = require('./lib/config/config');

// Parse JSON body on requests
app.use(express.json());

// trust webpack or Apache proxy
app.set('trust proxy', 1);

if (process.env.NODE_ENV === 'production'){
    console.info('Starting app in production mode.');
} else {
    console.info('Starting app in development mode.', process.env.NODE_ENV);
    // this will allow you to set up a remote server that other devs can access locally
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', "x-token, Content-Type");
        res.header('Access-Control-Allow-Credentials', true);

        // Needed when using graphQL
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
}

// all of the controller files
app.use('/words', require('./lib/controllers/words'));
app.use('/classes', require('./lib/controllers/classes'));

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});

server.on('error', (error) => {
    console.error(`Post ${port} in use, exiting!`);
    process.exit(1);
});

module.exports = app;
