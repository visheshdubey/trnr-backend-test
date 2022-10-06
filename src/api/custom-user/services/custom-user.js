'use strict';

/**
 * custom-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::custom-user.custom-user');
