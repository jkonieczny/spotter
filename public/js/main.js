/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require('fluxxor');

var actions = require('./actions/actions.js');

var UserStore = require('./stores/userStore.js'),
	PageStore = require('./stores/pageStore.js');

var stores = {
  UserStore: new UserStore(),
  PageStore: new PageStore()
};

var flux = new Fluxxor.Flux(stores, actions);

console.log(1, flux);

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