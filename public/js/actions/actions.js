'use strict';

var CONSTANTS = require('../constants/constants');

var actions = {
	searchSelected: function(payload) {
		console.log('searchSelected', payload);
		this.dispatch(payload.constant, {value: payload.value});
	},
	users: {
		selectedUser: function(payload) {
			console.log('selectedUser', payload);
		}
	}
};

module.exports = actions;
