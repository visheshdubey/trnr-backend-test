module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/workouts/:userId',
      handler: 'workouts.Workouts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/workouts/:userId',
      handler: 'workouts.updateWorkouts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/workouts/:userId',
      handler: 'workouts.updateWorkouts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};