module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/product-list/:categoryId',
      handler: 'product-list.productList',
      config: {
        policies: [],
        middlewares: [],
      },
    },

  ],
};
