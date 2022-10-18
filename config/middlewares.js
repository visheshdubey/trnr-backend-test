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

// module.exports = ({ env }) => [
//   'strapi::errors',
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         useDefaults: true,
//         directives: {
//           'connect-src': ["'self'", 'https:'],
//           'img-src': [
//             "'self'",
//             'data:',
//             'blob:',
//             // 'res.cloudinary.com', // cloudinary images
//             // 'lh3.googleusercontent.com', // google avatars
//             // 'platform-lookaside.fbsbx.com', // facebook avatars
//             // 'dl.airtable.com', // strapi marketplace
//             `https://${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`
//           ],
//           'media-src': ["'self'", 'data:', 'blob:', `https://${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`],
//           upgradeInsecureRequests: null,
//         },
//       },
//     },
//   },
//   //rest of middlewares
// ];