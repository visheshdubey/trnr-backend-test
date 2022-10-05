module.exports = {
  async Search(ctx, next) {
    try {
      const data = await strapi
        .service("api::search.search")
        .Search(ctx.params.query);
      // console.log(data, "data");
      // console.log(ctx.params.categoryId)
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("productList report controller error", { moreDetails: err });
    }
  },
};