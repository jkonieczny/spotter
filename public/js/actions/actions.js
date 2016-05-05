'use strict';

var CONSTANTS = require('../constants/constants');

var actions = {
	page: {
		update: function(payload) {
			console.log('update page', payload);
			this.dispatch(CONSTANTS.PAGE.UPDATE, { page: payload.page });
		}
	},
	products: {
		add: function(payload) {
			this.dispatch(CONSTANTS.PRODUCTS.ADD, { product: payload.product });
		},
		remove: function(id) {
			this.dispatch(CONSTANTS.PRODUCTS.REMOVE, { id: id });
		}
	},
	user: {
		update: function(payload) {
			console.log('update user', payload);
			this.dispatch(CONSTANTS.USER.UPDATE, { user: payload.user });
		}
	}
};

module.exports = actions;
