module.exports = {
  async exerciseCategoryList(ctx, next) {
    try {
      const data = await strapi
        .service("api::exercise-category-list.exercise-category-list")
        .exerciseCategoryList(ctx.params.productId);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("exerciseCategoryList report controller error", { moreDetails: err });
    }
  },
  async exerciseCategory(ctx, next) {
    try {
      const data = await strapi
        .service("api::exercise-category-list.exercise-category-list")
        .exerciseCategory(ctx.params.productId, ctx.params.categoryId);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("exerciseCategoryList report controller error", { moreDetails: err });
    }
  },
};