'use strict';

/**
 * saved-workout service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::saved-workout.saved-workout');
