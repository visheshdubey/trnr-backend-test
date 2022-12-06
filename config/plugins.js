module.exports = ({ env }) => (
    env('DEVELOPMENT', false) && {
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
        }
    });

module.exports = ({ env }) => ({
    // ...
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.hostinger.com'),
                port: env('SMTP_PORT', 465),
                auth: {
                    user: env('SMTP_USERNAME', 'trnr@stackwaystech.com'),
                    pass: env('SMTP_PASSWORD', 'Zxcvbnm@123'),
                },
                // ... any custom nodemailer options
            },
            settings: {
                defaultFrom: 'trnr@stackwaystech.com',
                defaultReplyTo: 'trnr@stackwaystech.com',
            },
        },
    },
    // ...
});