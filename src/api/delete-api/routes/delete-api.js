// module.exports = {
//   routes: [
//     // {
//     //  method: 'GET',
//     //  path: '/delete-api',
//     //  handler: 'delete-api.exampleAction',
//     //  config: {
//     //    policies: [],
//     //    middlewares: [],
//     //  },
//     // },
//   ],
// };
module.exports = {
  routes: [
    // {
    //   method: 'GET',
    //   path: '/workouts/:userId',
    //   handler: 'workouts.Workouts',
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    {
      method: 'POST',
      path: '/delete',
      handler: 'delete-api.createDeleteRequest',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/delete/confirm/:confirmationCode',
      handler: 'delete-api.confirmDeletion',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // {
    //   method: 'PUT',
    //   path: '/workouts/:userId',
    //   handler: 'workouts.updateWorkouts',
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: 'DELETE',
    //   path: '/workouts/:userId',
    //   handler: 'workouts.updateWorkouts',
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
  ],
};