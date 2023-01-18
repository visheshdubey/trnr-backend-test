'use strict';

/**
 * A set of functions called "actions" for `usercsv`
 */

module.exports = {
  usercsv: async (ctx, next) => {
    try {
      const data = await strapi
        .service("api::usercsv.usercsv")
        .usercsv();
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("productList report controller error", { moreDetails: err });
    }
  }
};
