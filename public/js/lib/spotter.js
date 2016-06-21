'use strict';

var baseURL = 'https://data.spotter.online/api/';
var G = 'GET';
var P = 'POST';

var spotterAPI = {
	getClients: function(cb) {
		this.XHR('client/list', G, cb);
	},
	getProducts: function(cb) {
		this.XHR('products', G, cb);
	},
	getTrainer: function(cb) {
		this.XHR('profile', G, cb);
	},
	XHR: function(frag, method, cb) {
	    var xhr = new XMLHttpRequest();
	    xhr.addEventListener('load', function(data) {
			cb(JSON.parse(data.currentTarget.responseText));
	    });
	    xhr.open(method, 'https://data.spotter.online/api/' + frag, true);
	    xhr.setRequestHeader('Accept', 'application/json');
	    xhr.setRequestHeader('Authorization', 'Bearer ' + window.flux.stores.AuthStore.state.tokens.id_token);
	    xhr.send();

	    return xhr;
	}
};

module.exports = spotterAPI;