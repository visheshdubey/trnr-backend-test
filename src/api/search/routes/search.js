module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/search/:query',
      handler: 'search.Search',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};