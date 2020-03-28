# Typescript in Nodejs Starter Kit

A starter kit for <b>[Node.js](https://nodejs.org/)</b> project written with <b>[TypeScript](https://www.typescriptlang.org/)</b>.

This project is well organized, scalable and maintainable boilerplate as your application's business grows.

## Prerequisites

It's is recommended before start to have a basic knowledge about the following

- [TypeScript](https://www.typescriptlang.org/).
- [PostgreSQL](https://www.postgresql.org/).
- [Sequelize ORM](https://sequelize.org/).
- [Express](https://www.npmjs.com/package/express).
- [Express Validator](https://www.npmjs.com/package/express-validator).
- [Json API](https://jsonapi.org/) with [examples](https://jsonapi.org/examples/) (optional).

## Table of contents

- [Problem definition](#problem-definition).
- [How to solve the problem](#how-to-solve-the-problem).
- [Getting Started](#getting-started)
  - [Setup project dependencies](#setup-project-dependencies).
  - [Run project](#to-run-this-project-in-development-environment-run-the-command).
- [Project structure](#project-structure).
- [Database](#database) (PostgreSQL Integration).
- [API](#api)
  - [App specific error codes](#app-specific-error-codes).
  - [API examples](#api-examples).
- [Static code analysis](#static-code-analysis).

## Problem definition

As we know <b>JavaScript</b> doesn't enforce type checking by itself, this may not be a problem when developing small <b>Node.js</b> apps, but it will be a <b><i>BIG problem</i></b> when building a multi-module or scaled apps.

## How to solve the problem

Since <b>TypeScript</b> is a super set of <b>JavaScript</b>, we can have <b>Node.js</b> apps to be written using <b>TyeScript</b>.

<b>TypeScript</b> is transpiled using <b>TypeScript Compiler</b> - also known as <b>tsc</b> - which can be adjusted to output the desired version of <b>ECMAScript</b>.

## Getting Started

### Setup project dependencies

- If you have <b>yarn</b> installed on your machine:

  Open your terminal on the project's root folder & run the following command

  ```bash
  yarn
  ```

- If you don't have <b>yarn</b> installed on your machine:

  Open your terminal on the project's root folder & run the following command

  ```bash
  npm i -g yarn
  ```

  then

  ```bash
   yarn
  ```

### To run this project in development environment run the command

```bash
yarn run dev
```

### To build this project in run the command

```bash
yarn run build
```

### To run this project from the built output run the command

```bash
yarn run start
```

## Project structure

### Overview

We are building a simple electronics store with to basic entities

1. Category.
2. Product.

Each Category will have the properties

- `id: number` (🔑 primary key).
- `name: string`.

Each Product will have the properties

- `id: number` (🔑 primary key).
- `name: string`.
- `price: number`.
- `categoryId: number` (🗝 foreign key from category).

### Folder structure

```bash
./src
└── app
    ├── app.ts
    ├── categories
    │   ├── data
    │   ├── models
    │   └── validation
    ├── controllers
    ├── products
    │   ├── data
    │   ├── models
    │   └── validation
    ├── shared
    │   ├── db
    │   │   ├── models
    │   │   ├── helpers
    │   ├── middleware
    │   ├── models
    │   └── utils
    └── startup
        └── server.ts
```

- <span style="color: blue">app.ts</span> is the entry point of the application.

- <span style="color: blue">startup/server.ts</span> file is where <b>Node.js</b> server options getting set.

- Each folder on the <span style="color: blue">app</span> folder represents an application <span style="color: blue">module</span>.

- <span style="color: blue">shared module</span> contains <span style="color: blue">database definition</span>, <span style="color: blue">utilities</span> and <span style="color: blue">shared models</span> which will be used by other application modules.

- <span style="color: blue">controllers module</span> is where all application modules' routes are being defined.

- Each module may contains

  - <span style="color: blue">data</span> folder to define its data-access functionalities.
  - <span style="color: blue">models</span> folder in which the module models are defined.
  - <span style="color: blue">validation</span> folder in which all models validations are defined, e.g. validating a model for creating a category.
  - Each folder must has a <span style="color: blue">index.ts</span> by a convention to export each (<span style="color: blue">class</span>, <span style="color: blue">interface</span>, <span style="color: blue">function</span> & etc..) defined in this folder.

### Database

Until now this boilerplate supports two types of databases:

- In-memory Database (branch [master](https://github.com/FawzyMokhtar/TypeScript-in-Nodejs-Starter/tree/master)).
- PostgreSQL Database (current branch).

We are using a [postgresql](https://www.postgresql.org/) database along with [sequelize ORM](https://sequelize.org/).

The database schema and definition could be found in the location <span style="color: blue">./src/app/shared/db</span> .

Each database table must be defined as a [sequelize](https://sequelize.org/) model under the folder <span style="color: blue">./src/app/shared/db/models</span> .

In the file <span style="color: blue">./src/app/shared/db/models/index.ts</span> after exporting all defined models we should setup all models relations.

We use a class called <b>Database</b> defined in the file <span style="color: blue">./src/app/shared/db/helpers/database.model.ts</span> as central point to deal with all database models.

```typescript
import { Sequelize } from 'sequelize';
import { Category, Product } from '../models';

/* 
   Connect to database.
   NOTE: i'm connecting here to the database `typescript_in_nodejs_starter_db` on my `localhost` with username `postgres` and password 'fawzy'.
   You can change this data and use your data instead.
 */

/**
 * A singleton instance of sequelize that will be used across the application.
 *
 * @summary It's important to not use any other instances of sequelize other than this instance unless you have more than one database.
 */
const sequelize = new Sequelize('typescript_in_nodejs_starter_db', 'postgres', 'fawzy', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false /* Stop logging sql queries unless your are tracing some problems. */
});

/**
 * The Database helper that includes all functionalities related to the database and all of it's models.
 * @summary All of this class members are static.
 * @summary All database models should be registered in this class.
 * @summary All database models should be accessed only through this class as central point of database functionality.
 */
export class Database {
  /**
   * A singleton instance of sequelize that will be used across the application.
   *
   * @summary It's important to not use any other instances of sequelize other than this instance unless you have more than one database.
   */
  public static readonly sequelize: Sequelize = sequelize;

  /**
   * Tests the connection to the database using the provided credentials.
   */
  public static testDatabaseConnection(): Promise<void> {
    return sequelize.authenticate();
  }

  /**
   * Sync all defined models to the DB.
   * @param force If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
   */
  public static syncDatabase(force?: boolean): Promise<never> {
    return sequelize.sync({ force: force });
  }

  /**
   * The Category model that maps the `categories table` in the database.
   * The model name will be `categories` also.
   */
  public static get Categories(): typeof Category {
    return Category;
  }

  /**
   * The Product model that maps the `products table` in the database.
   * The model name will be `products` also.
   */
  public static get Products(): typeof Product {
    return Product;
  }
}
```

### API

Since we follow the [Json API](https://jsonapi.org/) standards, our web api should always return a response with this structure

```typescript
/**
 * Represents an application http-response's body in case of success or even failure.
 */
export interface AppHttpResponse {
  /**
   * Gets or sets the data that requested or created by the user.
   *
   * This property will has a value only if the request was succeeded.
   */
  data?: unknown;

  /**
   * Gets or sets the metadata for the http response.
   */
  meta?: AppHttpResponseMeta;

  /**
   * Gets or sets a set of errors that occurs during request processing.
   *
   * @summary e.g. validation errors, security errors or even internal server errors.
   */
  errors?: AppHttpResponseError[];
}
```

Where the `meta` has the structure

```typescript
/**
 * Represents an application http-response metadata.
 */
export interface AppHttpResponseMeta {
  /**
   * Gets or sets the current pagination page.
   */
  page?: number;

  /**
   * Gets or sets the maximum allowed items per-page.
   */
  pageSize?: number;

  /**
   * Gets or sets the count of the actual items in the current page.
   */
  count?: number;

  /**
   * Gets or sets the total count of items available in the database those match the query criteria.
   */
  total?: number;

  /**
   * Gets or sets the number of the previous pagination page.
   */
  previousPage?: number | undefined;

  /**
   * Gets or sets the number of the next pagination page.
   */
  nextPage?: number | undefined;

  /**
   * Gets or sets the total available pagination pages those match the query criteria.
   */
  totalPages?: number;
}
```

And each error in the `errors` property has to be

```typescript
/**
 * Represents an app http error that should be sent within a failed request's response.
 *
 * @summary All error members are optional but the more details the server sends back to the client the more easy it becomes to fix the error.
 */
export interface AppHttpResponseError {
  /**
   * Gets or sets the application-specific code for this error.
   */
  code?: AppErrorCode;

  /**
   * Gets or sets the name of the source that causes this error.
   *
   * Usually it's the name of the property that causes the error.
   *
   * The property maybe a nested property,
   * in this case use e.g. if we are validating a `Person` object use `address.postalCode` instead of `postalCode`.
   */
  source?: string;

  /**
   * Gets or sets a generic title of the problem.
   */
  title?: string;

  /**
   * Gets or sets a more descriptive details for the problem, unlike the generic @field title.
   */
  detail?: string;
}
```

#### App specific error codes

The code member of an error object contains an application-specific code representing the type of problem encountered. code is similar to title in that both identify a general type of problem (unlike detail, which is specific to the particular instance of the problem), but dealing with code is easier programmatically, because the “same” title may appear in different forms due to localization as described [here](https://jsonapi.org/examples/#error-objects-error-codes).

Our application-specific codes are defined in an `Enum` called `AppErrorCode` with the following definition

```typescript
/**
 * The application-specific error codes.
 */
export enum AppErrorCode {
  /** Un-authenticated code. */
  UnAuthenticated = 1,

  /** Access denied or forbidden code. */
  Forbidden = 2,

  /** Internal server code. */
  InternalServerError = 3,

  /** The field is required code. */
  IsRequired = 4,

  /** The field type is invalid. */
  InvalidType = 5,

  /** The field type is String and its length is invalid. */
  InvalidLength = 6,

  /** The entity field value already exists in another entity. */
  ValueExists = 7,

  /** The entity can't be deleted due to its existing relations with other entities. */
  CantBeDeleted = 8,

  /**
   * The related entity isn't found,
   * @summary e.g. you are trying to create a new product in a category which is not exists in the database.
   */
  RelatedEntityNotFound = 9
}
```

### API examples

- A <span style="color: green">success</span> response

  Searching for a list of products those matching some criteria

  `[GET]` `http://localhost:3000/api/products?name=Samsung&categories=1,2,3&page=1&pageSize=3`

  Should return a response like the following

  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Samsung Galaxy S5",
        "price": 5000,
        "categoryId": 1,
        "category": {
          "id": 1,
          "name": "Mobiles"
        }
      },
      {
        "id": 2,
        "name": "Samsung Galaxy S6",
        "price": 4500,
        "categoryId": 1,
        "category": {
          "id": 1,
          "name": "Mobiles"
        }
      },
      {
        "id": 15,
        "name": "Samsung 32 Inch HD LED Standard TV - UA32K4000",
        "price": 3550,
        "categoryId": 3,
        "category": {
          "id": 3,
          "name": "TVs"
        }
      }
    ],
    "meta": {
      "page": 1,
      "pageSize": 3,
      "count": 3,
      "total": 3,
      "totalPages": 1
    }
  }
  ```

- A <span style="color: #FF9966">bad-request</span> response

  Try to create a new product with a name that is already exists in the database

  `[POST]` `http://localhost:3000/api/products`

  ```json
  {
    "name": "Samsung Galaxy S5",
    "price": 12300.0,
    "categoryId": 1
  }
  ```

  Should return a response like the following

  ```json
  {
    "errors": [
      {
        "code": 7,
        "source": "name",
        "title": "Field value already exists",
        "detail": "Product name already exists"
      }
    ]
  }
  ```

- The <span style="color: red">internal server error</span>, <span style="color: #cc0">un-authenticated</span> and <span style="color: #ffcc00">forbidden</span> responses should follow the same convention.

## Static code analysis

We are using the following plugins to statically analysis our code

- [ESLint](https://eslint.org/).
- [Prettier](https://prettier.io/).
- [Husky](https://www.npmjs.com/package/husky).
- [Lint-Staged](https://www.npmjs.com/package/lint-staged).
