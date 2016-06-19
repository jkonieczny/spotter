/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require('fluxxor');

var actions = require('./actions/actions.js');

var UserStore = require('./stores/userStore.js'),
	PageStore = require('./stores/pageStore.js'),
	ProductStore = require('./stores/productStore.js'),
	AuthStore = require('./stores/authStore.js');

var stores = {
	AuthStore: new AuthStore(),
	UserStore: new UserStore(),
	PageStore: new PageStore(),
	ProductStore: new ProductStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on('dispatch', function(type, payload) {
	console.log('[Dispatch]', type, payload);
});

window.flux = flux;

var SpotterApp = require('./components/spotterApp.jsx');

var App = {
	init: function() {
		ReactDOM.render(
		  <SpotterApp flux={flux}/>,
		  document.getElementById('content')
		);
	}
};

module.exports = App;