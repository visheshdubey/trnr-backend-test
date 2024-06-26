module.exports = ({ env }) => ({
     'users-permissions': {
          config: {
               jwt: {
                    expiresIn: '2y',
               },
          },
     },
     upload: {
          config: {
               provider: 'aws-s3',
               providerOptions: {
                    accessKeyId: env('AWS_ACCESS_KEY_ID'),
                    secretAccessKey: env('AWS_ACCESS_SECRET'),
                    region: env('AWS_REGION'),
                    params: {
                         Bucket: env('AWS_BUCKET_NAME'),
                         defaultContainerName: env('STORAGE_CONTAINER_NAME')
                    },
               },
               // These parameters could solve issues with ACL public-read access — see [this issue](https://github.com/strapi/strapi/issues/5868) for details
               actionOptions: {
                    upload: {
                         ACL: null
                    },
                    uploadStream: {
                         ACL: null
                    },
               }
          },
     },
     email: {
          config: {
               provider: 'nodemailer',
               providerOptions: {
                    host: env('SMTP_HOST'),
                    port: env('SMTP_PORT'),
                    auth: {
                         user: env('SMTP_USERNAME'),
                         pass: env('SMTP_PASSWORD'),
                    },
                    // ... any custom nodemailer options
               },
               settings: {
                    defaultFrom: 'info@trnr.com',
                    defaultReplyTo: 'info@trnr.com',
               },
          },
     },
});