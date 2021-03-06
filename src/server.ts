#!/usr/bin/env node

/**
 * Module dependencies.
 */
import Debug from 'debug';
import http from 'http';
import app from './app';
import logger from './tools/logger';

const debug = Debug('gamerz:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val: any): any {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.SERVER_PORT || '7000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Event listener for HTTP server "error" event.
 */

function onError (error: any): any {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening (): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
/**
 * Listen on provided port, on all network interfaces.
 * connect to database
 */
import db from './core/models';

db.sequelize
    .sync()
    .then(() => {
        server.listen(port);
    })
    .catch((e: any) => console.log(e));

server.on('error', onError);
server.on('listening', onListening);
