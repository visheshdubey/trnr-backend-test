'use strict';

/**
 * exercise-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::exercise-category.exercise-category');
