'use strict';

var CONSTANTS = require('../constants/constants');

var actions = {
	auth: {
		autho: {
			get: function() {
				this.dispatch(CONSTANTS.AUTH.AUTHO.GET, {});
			},
			lock: function() {
				this.dispatch(CONSTANTS.AUTH.AUTHO.LOCK, {});
			},
			show: function() {
				this.dispatch(CONSTANTS.AUTH.AUTHO.SHOW, {});
			}
		},
		spotter: {
			get: function() {
				this.dispatch(CONSTANTS.AUTH.SPOTTER.GET, {});
			}
		}
	},
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
		search: function(payload) {
			this.dispatch(CONSTANTS.PRODUCTS.SEARCH, {
				brand: payload.brand_id,
				value: payload.search_term
			});
		},
		remove: function(id) {
			this.dispatch(CONSTANTS.PRODUCTS.REMOVE, { id: id });
		},
		reset: function() {
			this.dispatch(CONSTANTS.PRODUCTS.RESET);
		}
	},
	client: {
		set: function(payload) {
			console.log('set client', payload);
			this.dispatch(CONSTANTS.CLIENT.SET, { client: payload.client });
		}
	},
	clients: {
		get: function() {
			this.dispatch(CONSTANTS.CLIENTS.GET);
		}
	}
};

module.exports = actions;
