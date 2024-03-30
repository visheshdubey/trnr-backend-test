/* -------------------------------------------------------------------------- */
/*                               Local Configs                               */
/* -------------------------------------------------------------------------- */
module.exports = ({ env }) => ({
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
  },
});
/* -------------------------------------------------------------------------- */
/*                             Production Configs                             */
/* -------------------------------------------------------------------------- */
const path = require('path');

module.exports = ({ env }) => (
  env('DEVELOPMENT', false) ?

    {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      },
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


// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: env('DATABASE_HOST'),
//       port: env.int('DATABASE_PORT'),
//       database: env('DATABASE_NAME'),
//       user: env('DATABASE_USERNAME'),
//       password: env('DATABASE_PASSWORD'),
//       ssl: {
//         rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
//       },
//     },
//     debug: false,
//   },
// });
