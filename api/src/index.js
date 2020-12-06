/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

// create special start message
app.service('messages').create({
    text: 'server started at ' + new Date().toISOString()
});
app.service('my-object-list').create({
    name: 'server startup',
    value: new Date().toISOString(),
    description: 'server started at value..'
});
