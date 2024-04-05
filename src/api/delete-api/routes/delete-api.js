module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/delete',
      handler: 'delete-api.createDeleteRequest',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};