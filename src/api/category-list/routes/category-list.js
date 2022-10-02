module.exports = {
  routes: [
    {
      method: "GET",
      path: "/category-list",
      handler: "category-list.categoryList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};