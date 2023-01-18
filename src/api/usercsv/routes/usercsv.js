module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/usercsv',
      handler: 'usercsv.usercsv',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
