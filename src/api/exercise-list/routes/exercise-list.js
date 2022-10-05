module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/exercise-list',
      handler: 'exercise-list.exerciseList',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
