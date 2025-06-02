'use strict';

/**
 * billing controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::billing.billing');
