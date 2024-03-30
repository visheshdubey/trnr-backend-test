module.exports = {
  async Workouts(ctx, next) {
    try {
      const data = await strapi
        .service("api::workouts.workouts")
        .Workouts(ctx.state.user.id);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Workouts controller error", { moreDetails: err });
    }
  },
  async updateWorkouts(ctx, next) {
    try {
      const data = await strapi
        .service("api::workouts.workouts")
        .updateWorkouts(ctx.state.user.id, ctx.request.body, ctx.request.querystring);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Workouts controller error", { moreDetails: err });
    }
  },

};