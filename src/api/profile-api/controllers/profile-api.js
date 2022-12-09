'use strict';

/**
 * A set of functions called "actions" for `profile-api`
 */

module.exports = {
  async getProfile(ctx, next) {
    try {
      const data = await strapi
        .service("api::profile-api.profile-api")
        .getProfile(ctx.state.user.id);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("User Profile controller error", { moreDetails: err });
    }
  },
  async createProfile(ctx, next) {
    try {
      const data = await strapi
        .service("api::profile-api.profile-api")
        .createProfile(ctx.params.userID, ctx.request.body);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("User Profile controller error", { moreDetails: err });
    }
  },
  async updateProfile(ctx, next) {
    try {
      const data = await strapi
        .service("api::profile-api.profile-api")
        .updateProfile(ctx.state.user.id, ctx.request.body);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("User Profile controller error", { moreDetails: err });
    }
  },
  async test(ctx, next) {
    try {
      ctx.body = 'test';
    } catch (error) {
      ctx.badRequest("User Profile controller error", { moreDetails: error });
    }
  }
};