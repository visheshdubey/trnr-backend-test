module.exports = {
  async exerciseList(ctx, next) {
    try {
      const data = await strapi
        .service("api::exercise-list.exercise-list")
        .exerciseList();
      // console.log(data, "data");
      console.log(ctx.params.id)
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("exerciseList report controller error", { moreDetails: err });
    }
  },
};