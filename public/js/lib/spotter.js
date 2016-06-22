'use strict';

var baseURL = 'https://data.spotter.online/api/';
var G = 'GET';
var P = 'POST';

var productQueue = [];

var spotterAPI = {
	addClient: function(data, cb) {
		this.XHR('client/new', P, cb, JSON.stringify(data));
	},
	getClients: function(cb) {
		this.XHR('client/list', G, cb);
	},
	getProducts: function(query, cb) {
		productQueue.forEach(function(xhr) {
			xhr.abort();
		});
		productQueue = [];

		productQueue.push(this.XHR('products' + query, G, cb));
	},
	getTrainer: function(cb) {
		this.XHR('profile', G, cb);
	},
	sendClientEmail: function(data, cb) {
		this.XHR('recommend/new', P, cb, JSON.stringify(data));
	},
	XHR: function(frag, method, cb, data) {
	    var xhr = new XMLHttpRequest();
	    xhr.addEventListener('load', function(data) {
			cb(JSON.parse(data.currentTarget.responseText));
	    });
	    xhr.open(method, 'https://data.spotter.online/api/' + frag, true);
	    xhr.setRequestHeader('Accept', 'application/json');
	    xhr.setRequestHeader('Authorization', 'Bearer ' + window.flux.stores.AuthStore.state.tokens.id_token);
	    if (method === 'POST') {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
	    } else {
		    xhr.send();
		}

	    return xhr;
	},
	xhrImage: function(id, file, cb) {
		var formData = new FormData();
		formData.append('file', file);

		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', function(data){
			cb(JSON.parse(data.currentTarget.responseText));
		}, false);

		xhr.open('POST', 'https://data.spotter.online/api/client/update-image/' + id);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setRequestHeader('Authorization', 'Bearer ' + window.flux.stores.AuthStore.state.tokens.id_token);

		xhr.send(formData);
	},
	generateQueryString: function(obj) {
		var str = [];
		for(var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
		return str.join('&');
	}
};

module.exports = spotterAPI;