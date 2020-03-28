import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { errorHandler, Logger, Database } from '../shared';

/** All of application routes as pairs of (Router &  Relative Route) */
import { categoriesRouter, categoriesRelativeRoute, productsRouter, productsRelativeRoute } from '../controllers';

/**
 * Adds a set of middleware only if the app runs on the production machine.
 * @param app The express application to add the set of production middleware to it.
 */
function setupProduction(app: Application): void {
  /* Only if the app runs on the production machine. */
  if (process.env.NODE_ENV === 'production') {
    /* Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help! */
    app.use(helmet());

    /* Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.
     * Use the compression middleware for gzip compression in your Express app.
     */
    app.use(compression());
  }
}

/**
 * Sets the http-request options for an express server.
 * @param app The express application to set its express server's request options.
 */
function setRequestOptions(app: Application): void {
  /**
   * Enable CORS to allow any javascript client to consume your server's api.
   */
  app.use(cors());

  /**
   * Allow parse incoming requests as JSON payloads.
   * The limit of request body size my be set using this option { limit: '5mb' }, default is 100kb.
   */
  app.use(express.json());

  /**
   * Allow parse incoming urlencoded requests bodies.
   * The limit of request body size my be set using this option { limit: '5mb' }, default is 100kb.
   */
  app.use(express.urlencoded({ extended: true }));
}

/**
 * Registers the routes for an express server.
 * @param app The express application that its express server will be used to register the routes.
 */
function registerRoutes(app: Application): void {
  /**
   * The base-route prefix for the api.
   *
   * e.g. `/api/categories`, `/api/products`.
   */
  const baseRoute = '/api/';

  /** Start register routes. */
  app.use(baseRoute + categoriesRelativeRoute, categoriesRouter);
  app.use(baseRoute + productsRelativeRoute, productsRouter);
}

/**
 * Setups an express server on top of the provided instance of express application.
 * @param app The express application that will be used to setup an express server.
 */
export function setupServer(app: Application): void {
  /**
   * The order matters.
   * 1. Setup production middleware.
   * 2. Set request options.
   * 3. Register routes.
   * 4. Add the error-handler middleware at the very end of pipeline.
   */
  setupProduction(app);
  setRequestOptions(app);
  registerRoutes(app);
  app.use(errorHandler);
}

/**
 * Starts an express server.
 * @param app The express application to start its express server.
 */
export function startServer(app: Application): void {
  const port = process.env.PORT || 3000;

  /* Ensure that we don't start the server unless database is connected. */
  Database.syncDatabase().then(() =>
    app.listen(port, () => Logger.info(`Express server is running on port ${port}`, null, true))
  );
}
