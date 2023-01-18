module.exports = ({ env }) => [
  "strapi::errors",
  // "strapi::cors",
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      header: '*',
      // origin: ['http://localhost:1337', '*'],

    }
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::favicon",
  "strapi::public",
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', `*.amazonaws.com`],
          'media-src': ["'self'", 'data:', 'blob:', `https://${env('AWS_BUCKET_NAME')}.s3.${env('AWS_REGION')}.amazonaws.com`],

          upgradeInsecureRequests: null,
        },
      },
    },
  }

];

