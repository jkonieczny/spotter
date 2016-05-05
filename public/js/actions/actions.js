'use strict';

var CONSTANTS = require('../constants/constants');

var actions = {
	page: {
		update: function(payload) {
			console.log('update page', payload);
			this.dispatch(CONSTANTS.PAGE.UPDATE, {page: payload.page});
		}
	}
};

module.exports = actions;
