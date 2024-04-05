'use strict';

/**
 * A set of functions called "actions" for `delete-api`
 */

module.exports = {
  async createDeleteRequest(ctx, next) {
    try {
      const data = await strapi
        .service("api::delete-api.delete-api")
        .createDeleteRequest(ctx.state.user, ctx.request.body, ctx.request.querystring);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Delete API controller error", { moreDetails: err });
    }
  }
};
