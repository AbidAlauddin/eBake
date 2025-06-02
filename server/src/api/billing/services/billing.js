'use strict';

/**
 * billing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::billing.billing');
