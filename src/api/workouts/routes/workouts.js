module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/workouts/',
      handler: 'workouts.Workouts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/workouts/',
      handler: 'workouts.updateWorkouts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/workouts/',
      handler: 'workouts.updateWorkouts',
      config: {
        policies: [],
        middlewares: [],
      },
    },

  ],
};