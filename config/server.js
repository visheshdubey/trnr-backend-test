module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
/* -------------------------------------------------------------------------- */
/*          For production, you can use the following configuration:          */
/* -------------------------------------------------------------------------- */
module.exports = ({ env }) => ({
  url: env('DEVELOPMENT') === 'false' ? `https://app.trnr.com/` : "http://localhost:1337", // 
})


