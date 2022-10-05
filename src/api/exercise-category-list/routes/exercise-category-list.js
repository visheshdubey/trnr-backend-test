module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/exercise-category-list/:productId',
      handler: 'exercise-category-list.exerciseCategoryList',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/exercise-category-list/:productId/:categoryId',
      handler: 'exercise-category-list.exerciseCategory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
