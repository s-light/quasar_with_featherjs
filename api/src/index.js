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
// app.service('messages').create({
//     text: 'server started at ' + new Date().toISOString()
// });
// app.service('global-config').create({
//     name: 'serialDevice',
//     value:'/dev/ttyUSB1',
//     description: 'system path to serial device'
// });
