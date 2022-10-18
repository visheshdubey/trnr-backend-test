module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-create/:userId',
      handler: 'user-create.getUser',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/user-create/:userId',
      handler: 'user-create.updateUser',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/user-create/:userId',
      handler: 'user-create.updateUser',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};