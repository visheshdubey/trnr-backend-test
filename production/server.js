module.exports = ({ env }) => ({
    url: env("MY_HEROKU_URL"),
    proxy: true,
    app: {
        keys: env.array("APP_KEYS", ["XeYF7XG3ubx3H6uq96gvFg==", "XeYF7XG3ubx3H6uq96gvFg=="]),
    },
});