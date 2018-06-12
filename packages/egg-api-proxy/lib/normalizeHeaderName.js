'use strict';
const each=require('lodash/each');

module.exports = function normalizeHeaderName(headers, normalizedName) {
    each(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
