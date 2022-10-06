module.exports = {
  async productList(ctx, next) {
    try {
      const data = await strapi
        .service("api::product-list.product-list")
        .productList(ctx.params.categoryId);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("productList report controller error", { moreDetails: err });
    }
  },
};