module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/profile/',
      handler: 'profile-api.getProfile',
      config: {
        policies: [],
        middlewares: [],
      }
    },
    {
      method: 'POST',
      path: '/profile/:userID',
      handler: 'profile-api.createProfile',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/profile/',
      handler: 'profile-api.updateProfile',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};