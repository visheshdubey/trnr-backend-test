module.exports = {
  async categoryList(ctx, next) {
    try {
      const data = await strapi
        .service("api::category-list.category-list")
        .categoryList();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("categoryList report controller error", { moreDetails: err });
    }
  },
};