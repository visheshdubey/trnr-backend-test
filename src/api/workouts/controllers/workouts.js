module.exports = {
  async Workouts(ctx, next) {
    try {
      const data = await strapi
        .service("api::workouts.workouts")
        .Workouts(ctx.params.userId);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Workouts controller error", { moreDetails: err });
    }
  },
  async addWorkouts(ctx, next) {
    try {
      const data = await strapi
        .service("api::workouts.workouts")
        .addWorkouts(ctx.params.userId, ctx.request.body);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Workouts controller error", { moreDetails: err });
    }
  },
  async updateWorkouts(ctx, next) {
    try {
      const data = await strapi
        .service("api::workouts.workouts")
        .updateWorkouts(ctx.params.userId, ctx.request.body);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Workouts controller error", { moreDetails: err });
    }
  },
};