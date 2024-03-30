module.exports = {
     apps: [
          {
               name: 'strapi-1',
               cwd: '~/trnr-backend-test',
               script: 'yarn',
               args: 'start',
               interpreter: '/bin/bash',
               env: {
                    NODE_ENV: 'production',
               },
          },
     ],
};
