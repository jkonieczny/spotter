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
	email: {
		send: function() {
			this.dispatch(CONSTANTS.EMAIL.SEND, {});
		}
	},
	page: {
		goBack: function() {
			this.dispatch(CONSTANTS.PAGE.GOBACK, {});
		},
		update: function(payload) {
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
		add: function(payload) {
			console.log('set add', payload);
			this.dispatch(CONSTANTS.CLIENT.ADD, { client: payload.client });
		},
		image: {
			add: function(payload) {
				console.log('image add');
				this.dispatch(CONSTANTS.CLIENT.IMAGE.ADD, payload);
			},
			uploaded: function(payload) {
				this.dispatch(CONSTANTS.CLIENT.IMAGE.UPLOADED, payload);
			}
		},
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
