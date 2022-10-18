module.exports = {
  async getUser(ctx, next) {
    try {
      const data = await strapi
        .service("api::user-create.user-create")
        .getUser(ctx.params.userId);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("User controller error", { moreDetails: err });
    }
  },
  async updateUser(ctx, next) {
    try {
      const data = await strapi
        .service("api::user-create.user-create")
        .updateUser(ctx.params.userId, ctx.request.body);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("User controller error", { moreDetails: err });
      console.log(err);
    }
  },
};