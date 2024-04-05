const path = require('path');

module.exports = ({ env }) => (
  env('DEVELOPMENT') === 'true' ?

    {
      connection: {
        client: 'postgres',
        connection: {
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
          database: process.env.DATABASE_NAME,
          user: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          ssl: false
        },
        debug: true,
      }
    } : {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
        debug: false,
      },
    });
