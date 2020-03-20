import express, { Application } from 'express';
import * as startup from './startup';
import { unhandledExceptionAndRejectionHandler } from './shared';

/**
 * A singleton instance of express application that will be used to setup our express server.
 *
 * It's important to not use any other instances of express application other than this instance.
 */
const app: Application = express();

/**
 * Bootstrap the app in the following order.
 * 1. Call the unhandled-exception-and-rejection-handler function at the very beginning of node.js application startup.
 * 2. Setup the express server.
 * 3. Start express server after all are done.
 */
unhandledExceptionAndRejectionHandler();
startup.setupServer(app);
startup.startServer(app);
